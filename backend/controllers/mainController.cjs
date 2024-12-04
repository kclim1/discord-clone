const User = require("../models/userSchema.cjs");
const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");

exports.signup = async (req, res) => {
  try {
    const { username, password , email } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log("User already exists. Please log in.");
      return res
        .status(400)
        .json({ message: "User already exists. Please log in." });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const objectId = new mongoose.Types.ObjectId().toString();
    const user = {
      email: email,
      username: username,
      password: hashedPassword,
      profileId : objectId
    };
    await User.create(user);
    console.log("Signup success");
    return res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    console.error(error);
    console.log("Signup failed");
    // Sending error response to the client
    return res
      .status(500)
      .json({ message: "Signup failed. Please try again." });
  }
};



