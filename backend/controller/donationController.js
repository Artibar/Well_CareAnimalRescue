
import Donation from "../models/Donation.js"
import razorpay from "razorpay"
import crypto from 'crypto'

export const createPaymentOrder = async (req, res) => {
    try {
        console.log('📥 Create Order Request:', {
            amount: req.body.amount,
            paymentMethod: req.body.notes?.paymentMethod
        });
        const { amount, currency, receipt, notes } = req.body
        if (!amount || amount <= 0) {
            return res.status(400).json({ message: "Invalid amount", success: false })
        }
        if (!notes || !notes.fullName || !notes.phone || !notes.paymentMethod) {
            return res.status(400).json({ message: "Incomplete donor information", success: false })
        }
        const validMethods = ['card', 'upi', 'netbanking', 'wallet']
        if (!validMethods.includes(notes.paymentMethod)) {
            return res.status(400).json({ message: "Invalid payment method", success: false })
        }

        // create razorpay order
        const options = {
            amount: Math.round(amount * 100), // amount in paise
            currency: currency || "INR",
            receipt: receipt || `receipt_${Date.now()}`,
            notes: {
                fullName: notes.fullName,
                phone: notes.phone,
                paymentMethod: notes.paymentMethod
            }
        }
        console.log('Creating Razorpay order with options:', options);
        const order = await razorpay.orders.create(options)
        console.log('Razorpay order created successfully:', order);

        //donation to data base
        const transactionId = generateTransactionId();
        const donation = new Donation({
            fullName: notes.fullName,
            phone: notes.phone,
            email: notes.email || null,
            amount: amount,
            message: notes.message || null,
            paymentMethod: notes.paymentMethod,
            razorpayOrderId: order.id,
            transactionId: transactionId,
            status: 'pending',
            ipAddress: getClientIp(req),
            userAgent: req.headers['user-agent']

        })
        await donation.save()
        console.log('✓ Donation saved to database:', donation._id);
        return res.status(200).json({
            message: "Order created successfully", success: true, order: {
                id: order.id,
                amount: order.amount,
                currency: order.currency
            },
            key_id: process.env.RAZORPAY_KEY_ID,
            donation_id: donation._id,
            transaction_id: transactionId
        })

    } catch (error) {
        console.error('❌ Error creating order:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating order',
            error: error.message
        });
    }
}

export const verifyPayment = async (req, res) => {
    console.log('🔍 Verify Payment Request');
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, donation_id } = req.body
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !donation_id) {
            return res.status(400).json({ message: "Incomplete payment details", success: false })
        }
        const sign = razorpay_order_id + "|" + razorpay_payment_id
        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest('hex');
        console.log("Signature verification:", {
            received: razorpay_signature.substring(0, 10) + "...",
            expected: expectedSign.substring(0, 10) + "...",
            match: razorpay_signature === expectedSign
        })
    if (razorpay_signature === expectedSign) {
        console.log("Signature verified successfully.")
        const donation = await Donation.findOneAndUpdate({ razorpayOrderId: razorpay_order_id },
            {
                razorpayPaymentId: razorpay_payment_id,
                razorpaySignature: razorpay_signature,
                status: 'completed',
                completedAt: new Date(),
                updatedAt: new Date()
            },
            { new: true },
        )
        if (!donation) {
            console.error('❌ Donation not found for order:', razorpay_order_id);
            return res.status(404).json({
                success: false,
                message: 'Donation record not found'
            });
        }

        console.log('✓ Donation updated to completed:', donation.transactionId);
        return res.status(200).json({
            success: true,
            message: 'Payment verified successfully',
            donation: {
                id: donation._id,
                transactionId: donation.transactionId,
                amount: donation.amount,
                status: donation.status,
                donorName: donation.fullName,
                email: donation.email
            }
        });
    } else {
      // Signature verification failed
      console.error('❌ Payment signature verification failed');
      
      await Donation.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        {
          status: 'failed',
          updatedAt: new Date()
        }
      );

      res.status(400).json({
        success: false,
        message: 'Payment signature verification failed'
      });
    }
    } catch (error) {
        console.error('❌ Error verifying payment:', error);
        res.status(500).json({
            success: false,
            message: 'Error verifying payment',
            error: error.message
        });
    }
}
export const handleWebhook = async (req, res) => {
    console.log('📨 Webhook received');
    try {
        const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
        const webhookSignature = req.headers['x-razorpay-signature'];
        if (!webhookSecret) {
      console.warn('⚠️  Webhook secret not configured');
      return res.status(200).json({ received: true });
        }
      const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(JSON.stringify(req.body))
      .digest('hex');

    if (webhookSignature !== expectedSignature) {
      console.error('❌ Invalid webhook signature');
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid webhook signature' 
      });
    }

    const event = req.body.event;
    const paymentEntity = req.body.payload.payment.entity;

    console.log('Webhook event:', event);

    // Handle different webhook events
    switch (event) {
      case 'payment.captured':
        await Donation.findOneAndUpdate(
          { razorpayOrderId: paymentEntity.order_id },
          {
            status: 'completed',
            razorpayPaymentId: paymentEntity.id,
            completedAt: new Date(),
            updatedAt: new Date()
          }
        );
        console.log('✓ Payment captured webhook processed');
        break;

      case 'payment.failed':
        await Donation.findOneAndUpdate(
          { razorpayOrderId: paymentEntity.order_id },
          {
            status: 'failed',
            updatedAt: new Date()
          }
        );
        console.log('✓ Payment failed webhook processed');
        break;

      case 'payment.authorized':
        console.log('Payment authorized:', paymentEntity.id);
        break;

      default:
        console.log('Unhandled webhook event:', event);
    }

    res.status(200).json({ success: true, received: true });
    } catch (error) {
        console.error('❌ Error processing webhook:', error);
        res.status(500).json({
            success: false,
            message: 'Error processing webhook',
            error: error.message
        });
    }
}
export const getAllDonations = async(req, res)=>{
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const status = req.query.status;
    const skip = (page - 1) * limit;

    const query = {};
    if (status) query.status = status;

    const [donations, total] = await Promise.all([
      Donation.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select('-razorpaySignature -__v'),
      Donation.countDocuments(query)
    ]);

    res.json({
      success: true,
      data: donations,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('❌ Error fetching donations:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching donations',
      error: error.message
    });
  }
}
export const getDonationByTransactionId = async(req, res)=>{
  try {
     const donation = await Donation.findOne({ 
      transactionId: req.params.transactionId 
    }).select('-razorpaySignature -__v');

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: 'Donation not found'
      });
    }

    res.json({
      success: true,
      data: donation
    });
  } catch (error) {
    console.error('❌ Error fetching donation:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching donation',
      error: error.message
    });
  }
}

export const getPaymentDetailByRazorpay = async(req, res)=>{
  try {
     const payment = await razorpay.payments.fetch(req.params.paymentId);
    res.json({
      success: true,
      data: payment
    });
  } catch (error) {
    console.error('Error fetching payment:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching payment details',
      error: error.message
    });
  }
};
