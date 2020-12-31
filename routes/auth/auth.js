import { Router } from "express";
import User from "../../model/User.js";
import { registerValidation, loginValidation } from "../../validation.js";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/register", async (req, res) => {
  // Validate data
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, email, password } = req.body;

  //Check if the user is in the database
  const emailExist = await User.findOne({ email: email });
  if (emailExist) return res.status(400).send("Email already in use");

  // Create a new uer
  const user = new User({
    name: name,
    email: email,
    password: await User.encryptPassword(password),
  });

  try {
    await user.save();
    res.send("User Registered Succesfully");
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  // Validate Login
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const { email, password } = req.body;

  //Check if the email exists
  const user = await User.findOne({ email: email });
  if (!user) return res.status(400).send("User is not registered");

  // Password is correct
  const validPassword = User.comparePassword(password, user.password);
  if (!validPassword) return res.status(400).send("Password is not valid");

  //Create the token
  const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token);

  res.send("Logged in!");
});

export default router;
