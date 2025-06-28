const express = require("express");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const Order = require("../models/orderModels");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

router.post("/placeorder", async (req, res) => {
  const { token, subtotal, currentUser, cartItems } = req.body;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: subtotal * 100,
        currency: "INR",
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
      const newOrder = new Order({
        name: currentUser.name,
        email: currentUser.email,
        userid: currentUser._id,
        orderItems: cartItems,
        orderAmount: subtotal,
        shippingAddress: {
          street: token.card.address_line1,
          city: token.card.address_city,
          country: token.card.address_country,
          zip: token.card.address_zip,
        },
        transactionId: payment.source.id,
      });
      newOrder.save();
      res.send("Payment successful");
    } else {
      res.send("Payment Failed");
    }
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
});

router.post("/getuserorders", async (req, res) => {
  const { userid } = req.body;
  try {
    const orders = await Order.find({ userid: userid });
    res.send(orders);
  } catch (error) {
    return res.status(400).send("Something Went Wrong");
  }
});

router.post("/getallorders", async (req, res) => {
  try {
    const orders = await Order.find({});
    res.send(orders);
  } catch (error) {
    return res.status(400).send("Error in getting all orders");
  }
});

router.post("/deliver/:orderId", async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (order) {
      order.isDelivered = true;
      await order.save();
      res.send("Order Delivered Successfully");
    } else {
      res.status(404).send("Order not found");
    }
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
});

module.exports = router;
