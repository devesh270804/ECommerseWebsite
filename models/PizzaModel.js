const { time } = require("console");
const mongoose = require("mongoose");
const { type } = require("os");

const pizzaSchema = mongoose.Schema(
  {
    name: { type: String, require },
    varients: { type: Array, require },
    prices: { type: Array, require },
    category: { type: String, require },
    image: { type: String, require },
    description: { type: String, require },
  },
  {
    timestamps: true,
  }
);

const pizzamodel = mongoose.model("pizzas", pizzaSchema);
module.exports = pizzamodel;
