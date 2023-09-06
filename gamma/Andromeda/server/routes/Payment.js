const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const Razorpay = require("razorpay");
const Payment = require("../models/payment.js");

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_APT_SECRET,
});

router.post("/checkout", async (req, res) => {
    const options = {
      amount: req.body.total*100,
      currency: "INR",
    };
    const order = await instance.orders.create(options);
    res.status(200).json({
      success: true,
      order,
    });
});

router.get("/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);

router.post("/paymentverification",async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
  
    const body = razorpay_order_id + "|" + razorpay_payment_id;
  
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
      .update(body.toString())
      .digest("hex");
  
    const isAuthentic = expectedSignature === razorpay_signature;
  
    if (isAuthentic) {
      // Database comes here
  
      await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });
  
      await res.redirect(
        'http://localhost:3000'
      );
    } else {
      res.status(400).json({
        success: false,
      });
    }
  });

module.exports = router;



