const User = require("../models/userSchema.cjs");
const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");
const formValidator = require("../validators/formvalidator");
const { validationResult } = require("express-validator");

exports.signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, password, firstName, lastName } = req.body;
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
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: hashedPassword,
      profileId: objectId,
      friends : [],
      isOnline : false,
      profilePic: ""
    };
    const createdUser = await User.create(user);

    return res.status(201).json({ user: createdUser });
  } catch (error) {
    console.error(error);
    console.log("Signup failed");
    return res
      .status(500)
      .json({ message: "Signup failed. Please try again." });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { username, email, profilePic, profileId, password } = req.body;
    const updateData = { username, email, profilePic };

    if (password) {
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);
      updateData.password = hashedPassword; // Add hashed password to the update object
    }

    // Find and update the user
    const updatedUser = await User.findOneAndUpdate(
      { profileId }, // Query by profileId
      updateData, // Dynamically update only provided fields
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log('updated user backedn' , updatedUser)
    res.status(200).json(updatedUser);
    console.log("update complete");
  } catch (error) {
    console.error("Error updating profile:", error);
    console.log("i am safe")
    res.status(500).json({ message: "Failed to update profile" });
  }
};

exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      console.error("Error during logout:", err);
      return next(err);
    }

    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        return next(err);
      }
      // console.log("req body", req.body);
      res.clearCookie("connect.sid");
      // console.log("Successful logout");
      res.status(200).json({ message: "logout succesful" });
    });
  });
};

exports.getProfile = async (req, res) => {
  try {
    const profileId = req.params.profileId;
    const profile = await User.findOne({ profileId });
    if (profile) {
      // console.log("user found via profile id ", profile);
      return res.json(profile);
    }
    return res.status(400).json({ message: "profile not found" });
  } catch (error) {
    console.error(error);
  }
};


exports.checkSession = (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({
      isAuthenticated: true,
      user: req.user,
    });
  } else {
    res.status(401).json({
      isAuthenticated: false,
      message: 'User is not authenticated',
    });
  }
};

