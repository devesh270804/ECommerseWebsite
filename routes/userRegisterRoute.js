const express = require("express");
const router = express.Router();
const UserModel = require("../models/userModel");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = new UserModel({
    name,
    email,
    password,
  });

  try {
    await newUser.save();
    res.send("User registered successfully");
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Error registering user");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email, password });
    if (user.length > 0) {
      const newUser = {
        name: user[0].name,
        email: user[0].email,
        isAdmin: user[0].isAdmin,
        _id: user[0]._id,
      };
      console.log(newUser);
      res.send(newUser);
    }
  } catch (error) {
    console.error("Error login user: ", error);
    res.status(500).send("Error login user");
  }
});

router.get("/getallusers", async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.send(users);
  } catch (error) {
    return res.status(404).json({ message: error });
  }
});
module.exports = router;
