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

router.post("/getpizzabyid", async (req, res) => {
  const { pizzaid } = req.body;
  try {
    const pizza = await Pizza.findOne({ _id: pizzaid });
    console.log(pizza);
    res.send(pizza);
  } catch (error) {
    return res.status(400).json({
      message: "Error fetching pizzas",
      error: error.message,
    });
  }
});

router.post("/addpizza", async (req, res) => {
  const pizza = req.body;
  try {
    const newPizza = new Pizza({
      name: pizza.name,
      varients: ["small", "medium", "large"],
      prices: pizza.prices,
      category: pizza.category,
      image: pizza.image,
      description: pizza.description,
    });
    await newPizza.save();
    res.send("New Pizza added successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/editpizza", async (req, res) => {
  const { editedPizza } = req.body;
  try {
    const pizza = await Pizza.findOne({ _id: editedPizza._id });
    (pizza.name = editedPizza.name),
      (pizza.description = editedPizza.description),
      (pizza.image = editedPizza.image),
      (pizza.catergory = editedPizza.catergory),
      (pizza.prices = editedPizza.prices);

    await pizza.save();
    res.send("Pizza Eidted successfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/deletepizza", async (req, res) => {
  const { pizzaid } = req.body;
  try {
    await Pizza.findOneAndDelete({ _id: pizzaid });
    res.send("Pizza deleted successfully");
  } catch {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
