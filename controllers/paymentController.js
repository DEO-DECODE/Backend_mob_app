import Razorpay from "razorpay";
import crypto from "crypto";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_ID_KEY,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

export const createOrder = async (req, res, next) => {
  const { amount, currency, receipt } = req.body;

  const options = {
    amount: amount * 100, 
    currency: currency,
    receipt: receipt,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.status(200).json({ order, success: true, message: "Order Created Successfully" });
  } catch (error) {
    next(error); 
  }
};

export const verifyPayment = async (req, res, next) => {
  try {
    const { order_id, payment_id, signature } = req.body;
    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET_KEY); 
    hmac.update(order_id + "|" + payment_id);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature === signature) {
      res.status(200).json({ status: "success" });
    } else {
      res.status(500).json({ status: "failure" });
    }
  } catch (error) {
    next(error); 
  }
};
