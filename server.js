const express = require("express");
const cors = require("cors");
const db = require("./db");
require("dotenv").config();

const Pizza = require("./models/PizzaModel");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // 👈 your local Vite dev URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

const pizzasRoute = require("./routes/pizzasRoute");
const userRegisterRoute = require("./routes/userRegisterRoute");
const placeOrderRoute = require("./routes/ordersRoute");

app.use("/api/pizzas", pizzasRoute);
app.use("/api/users", userRegisterRoute);
app.use("/api/orders", placeOrderRoute);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.get("/getPizzas", (req, res) => {
  Pizza.find({})
    .then((pizzas) => {
      res.json(pizzas);
    })
    .catch((err) => {
      console.error("Error fetching pizzas:", err);
      res.status(500).send("Internal Server Error");
    });
});

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
