const express = require("express");
const router = express.Router();
const Pizza = require("../models/PizzaModel");
const e = require("express");

router.get("/getpizzas", async (req, res) => {
  try {
    const pizzas = await Pizza.find({});
    res.send(pizzas);
  } catch (error) {
    return res.status(400).json({
      message: "Error fetching pizzas",
      error: error.message,
    });
  }
});

module.exports = router;
