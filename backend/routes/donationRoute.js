
import express from 'express';
import { createPaymentOrder, verifyPayment, handleWebhook, getAllDonations, getDonationByTransactionId, getPaymentDetailByRazorpay} from "../controller/donationController.js"
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import {protect} from '../middleware/authMiddleware.js'
const donationRouter = express.Router();
donationRouter.post('/create-order',  createPaymentOrder);
donationRouter.post('/verify-payment', protect, verifyPayment);
donationRouter.post('/webhook', protect, authorizeRoles("admin", "volunteer"), handleWebhook);
donationRouter.get("/get-donations", protect, authorizeRoles("admin", "volunteer"), getAllDonations)
donationRouter.get("/transaction/:transactionId", protect, authorizeRoles("admin"), getDonationByTransactionId)
donationRouter.get("/payment/:razorpayPaymentId", protect, authorizeRoles("admin"), getPaymentDetailByRazorpay)
export default donationRouter;