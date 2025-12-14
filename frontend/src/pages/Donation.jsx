
import React, { useState } from 'react'
import { Heart, CreditCard, Smartphone, ChevronRight, Check, ArrowLeft, Lock, Shield, Star, Users, TrendingUp } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import Footer from '../component/Footer';
import Navbar from '../component/Navbar';
const Donation = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    amount: '',
    message: '',
    paymentMethod: '',
    upiId: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      desc: 'Visa, Mastercard, Rupay'
    },
    {
      id: 'upi',
      name: 'UPI Payment',
      icon: Smartphone,
      desc: 'Google Pay, PhonePe, Paytm'
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      icon: Shield,
      desc: 'All major banks supported'
    },
    {
      id: 'wallet',
      name: 'Wallets',
      icon: CreditCard,
      desc: 'Paytm, PhonePe wallet'
    }
  ];
  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.paymentMethod) {
      newErrors.paymentMethod = 'Please select a payment method';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};
    if (formData.paymentMethod === 'upi' && !formData.upiId.trim()) {
      newErrors.upiId = 'Please enter your UPI ID';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handlePaymentMethodSelect = () => {
    if (validateStep2()) {
      if (formData.paymentMethod === 'upi') {
        setStep(3);
      } else {
        handleRazorpayPayment();
      }
    }
  };

  const handleBackToStep1 = () => {
    setStep(1);
    setErrors({});
  };

  const handleBackToStep2 = () => {
    setStep(2);
    setErrors({});
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRazorpayPayment = async () => {
    setIsSubmitting(true);
    navigate('/donationPage')

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        alert('Razorpay SDK failed to load. Please check your internet connection.');
        setIsSubmitting(false);
        return;
      }

      const orderResponse = await axios.post('http://localhost:3000/razorpay/create-order', {
        amount: formData.amount,
        currency: 'INR',
        receipt: 'receipt_' + Date.now(),
        notes: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          paymentMethod: formData.paymentMethod,
          upiId: formData.upiId
        }
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(response => {
          if (response.status !== 200 && response.status !== 201) {
            throw new Error('Failed to create order');
          }
          return response.data;
        })
        .then(orderData => {
          if (!orderData.success) {
            throw new Error(orderData.message || 'Failed to create order');
          }
        })
        .catch(error => {
          console.error('Error creating order:', error);
          alert('There was an error creating your order. Please try again.');
        });

      if (orderResponse.status !== 200 || orderResponse.status !== 201) {
        const errorData = orderResponse.data;
        throw new Error(errorData.message || 'Failed to create order');
      }

      const orderData = await orderResponse.data;

      if (!orderData.success) {
        throw new Error(orderData.message || 'Failed to create order');
      }

      const options = {
        key: orderData.key_id,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: 'Your Organization',
        description: 'Donation Payment',
        order_id: orderData.order.id,
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: '#6366f1'
        },
        handler: async function (response) {
          try {
            const verifyResponse = await axios.post(
              '/razorpay/verify-payment',
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                donationDetails: {
                  fullName: formData.fullName,
                  email: formData.email,
                  phone: formData.phone,
                  amount: formData.amount,
                  message: formData.message,
                  paymentMethod: formData.paymentMethod,
                  upiId: formData.upiId
                }
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
                }
              }
            );

            if (verifyResponse.status !== 200 && verifyResponse.status !== 201) {
              throw new Error('Payment verification failed');
            }

            const verifyData = verifyResponse.data;
            if (verifyData.success) {
              setIsSubmitting(false);
              setStep(4);
            } else {
              throw new Error('Payment verification failed');
            }
          } catch (error) {
            console.error('Verification error:', error);
            alert('Payment verification failed. Please contact support.');
            setIsSubmitting(false);
          }
        },
        modal: {
          ondismiss: function () {
            setIsSubmitting(false);
          }
        }
      };

      if (formData.paymentMethod === 'upi') {
        options.method = 'upi';
        if (formData.upiId) {
          options.prefill.vpa = formData.upiId;
        }
      }

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error('Error initiating payment:', error);
      alert('There was an error processing your payment. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleUpiPayment = () => {
    if (validateStep3()) {
      handleRazorpayPayment();
    }
  };

  const selectPaymentMethod = (methodId) => {
    setFormData(prev => ({
      ...prev,
      paymentMethod: methodId
    }));
    if (errors.paymentMethod) {
      setErrors(prev => ({ ...prev, paymentMethod: '' }));
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50">


        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="lg:col-span-1 space-y-6 order-2 lg:order-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="w-full mb-6">
                  <div className="elementor-widget-container mb-5">
                    <img decoding="async" width="300" height="200" src="https://amtmindia.org/wp-content/uploads/2024/09/ci-2.png" className="attachment-full size-full wp-image-149 invert-100" alt=""></img>
                    <h1 className='text-4xl font-bold mb-6'>Saving Lives</h1>
                    <p className='text-gray-700 mt-4'>Every day, our rescue teams respond to emergency calls for injured birds, reptiles, small mammals, and other wildlife species. Without the proper medical supplies, equipment, or vehicles, our ability to reach and treat these animals is severely limited.</p>
                    <p className='mt-3.5'><strong>Your donations will help us:</strong></p>
                    <ul>
                      <li><strong>Stock Vital Medicines</strong>: Life-saving antibiotics, pain relievers, and treatment for diseases and injuries.</li>
                      <li><strong>Upgrade Rescue Equipment</strong>: Traps, nets, and safety gear for handling wildlife in distress.</li>
                      <li><strong>Purchase a Specialized Rescue Vehicle</strong>: Equipped with cages and medical supplies, this vehicle will ensure timely transport of wildlife to rehabilitation centers.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-1 order-1 lg:order-2">
              <div className="bg-linear-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-lg p-6 text-white pt-5 mb-6">
                <Lock className="w-10 h-10 mb-3 opacity-90" />
                <h3 className="text-lg font-bold mb-2">100% Secure</h3>
                <p className="text-sm opacity-90">Your payment information is encrypted and secure.</p>
                <div className="mt-4 flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span className="text-sm font-medium">SSL Encrypted</span>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  {[
                    { num: 1, label: 'Details' },
                    { num: 2, label: 'Payment' },
                    { num: 3, label: 'UPI' },
                    { num: 4, label: 'Done' }
                  ].map((item, idx) => (
                    <React.Fragment key={item.num}>
                      <div className="flex flex-col items-center flex-1">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step >= item.num ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                          {step > item.num ? <Check className="w-5 h-5" /> : item.num}
                        </div>
                        <span className={`text-xs mt-2 font-medium hidden sm:block ${step >= item.num ? 'text-indigo-600' : 'text-gray-500'}`}>
                          {item.label}
                        </span>
                      </div>
                      {idx < 3 && (
                        <div className={`flex-1 h-0.5 mx-2 ${step > item.num ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
                {step === 1 && (
                  <div className="p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Donation Information</h2>

                    <div className="space-y-5">
                      <div className="grid md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none`}
                            placeholder="John Doe" />
                          {errors.fullName && <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Phone <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none`}
                            placeholder="9876543210"
                            maxLength="10" />
                          {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none`}
                          placeholder="john@example.com" />
                        {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Amount (₹) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          name="amount"
                          value={formData.amount}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border ${errors.amount ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-lg font-semibold`}
                          placeholder="1000" />
                        {errors.amount && <p className="text-red-600 text-sm mt-1">{errors.amount}</p>}
                        <div className="grid grid-cols-4 gap-3 mt-3">
                          {[500, 1000, 2000, 5000].map(amt => (
                            <button
                              key={amt}
                              type="button"
                              onClick={() => handleInputChange({ target: { name: 'amount', value: amt } })}
                              className="px-4 py-2 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-lg hover:bg-indigo-100 font-semibold"
                            >
                              ₹{amt}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Message (Optional)
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows="3"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                          placeholder="Your message..." />
                      </div>

                      <button
                        onClick={handleNext}
                        className="w-full bg-linear-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg flex items-center justify-center gap-2"
                      >
                        Continue <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="p-8">
                    <button onClick={handleBackToStep1} className="flex items-center gap-2 text-gray-600 mb-6">
                      <ArrowLeft className="w-5 h-5" /> Back
                    </button>

                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Payment Method</h2>

                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      {paymentMethods.map(method => {
                        const Icon = method.icon;
                        return (
                          <div
                            key={method.id}
                            onClick={() => selectPaymentMethod(method.id)}
                            className={`border-2 ${formData.paymentMethod === method.id ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200'} rounded-xl p-5 cursor-pointer hover:border-indigo-300`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-start space-x-3">
                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${formData.paymentMethod === method.id ? 'bg-indigo-600' : 'bg-gray-100'}`}>
                                  <Icon className={`w-6 h-6 ${formData.paymentMethod === method.id ? 'text-white' : 'text-gray-600'}`} />
                                </div>
                                <div>
                                  <h3 className="font-bold text-gray-900">{method.name}</h3>
                                  <p className="text-sm text-gray-600">{method.desc}</p>
                                </div>
                              </div>
                              {formData.paymentMethod === method.id && (
                                <Check className="w-6 h-6 text-indigo-600" />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {errors.paymentMethod && <p className="text-red-600 text-sm mb-4">{errors.paymentMethod}</p>}

                    <div className="bg-slate-50 rounded-xl p-5 mb-6">
                      <h3 className="font-bold text-gray-900 mb-3">Summary</h3>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Amount</span>
                        <span className="font-bold text-indigo-600 text-xl">₹{formData.amount}</span>
                      </div>
                    </div>

                    <button
                      onClick={handlePaymentMethodSelect}
                      disabled={isSubmitting || !formData.paymentMethod}
                      className="w-full bg-linear-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? 'Processing...' : 'Proceed to Pay'}
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}

                {step === 3 && formData.paymentMethod === 'upi' && (
                  <div className="p-8">
                    <button onClick={handleBackToStep2} className="flex items-center gap-2 text-gray-600 mb-6">
                      <ArrowLeft className="w-5 h-5" /> Back
                    </button>

                    <h2 className="text-2xl font-bold text-gray-900 mb-6">UPI Payment</h2>

                    <div className="bg-linear-to-br from-indigo-600 to-purple-600 rounded-2xl p-8 text-center text-white mb-6">
                      <Smartphone className="w-16 h-16 mx-auto mb-4" />
                      <p className="text-5xl font-bold">₹{formData.amount}</p>
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        UPI ID <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="upiId"
                        value={formData.upiId}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border ${errors.upiId ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none`}
                        placeholder="yourname@paytm" />
                      {errors.upiId && <p className="text-red-600 text-sm mt-1">{errors.upiId}</p>}
                    </div>

                    <button
                      onClick={handleUpiPayment}
                      disabled={isSubmitting}
                      className="w-full bg-linear-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg disabled:opacity-50"
                    >
                      {isSubmitting ? 'Processing...' : 'Pay Now'}
                    </button>
                  </div>
                )}

                {step === 4 && (
                  <div className="p-8 text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check className="w-10 h-10 text-green-500" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h2>
                    <p className="text-gray-600 mb-8">Your donation of ₹{formData.amount} has been received.</p>
                    <button
                      onClick={() => {
                        setStep(1);
                        setFormData({ fullName: '', email: '', phone: '', amount: '', message: '', paymentMethod: '', upiId: '' });
                      }}
                      className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700"
                    >
                      Make Another Donation
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
      <Footer />
    </>
  );
};
export default Donation