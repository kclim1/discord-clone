const User = require("../models/userSchema.cjs");
const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");
const formValidator = require('../validators/formvalidator')
const { validationResult } = require('express-validator')
const cloudinary = require('../middleware/cloudinary.cjs')


exports.signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, password , firstName , lastName } = req.body;
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
      firstName : firstName,
      lastName : lastName , 
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



exports.updateProfile = async (req,res)=>{
  try{
    const {username , email , profilePic} = req.body
    const profileId = req.user.id 
  }catch(error){
    console.error('failed to update profile' , error )
  }
}


exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      console.error('Error during logout:', err);
      return next(err);
    }

    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
        return next(err);
      }
      console.log("req body" , req.body)
      res.clearCookie('connect.sid'); 
      console.log('Successful logout');
      res.status(200).json({message: "logout succesful"})
    });
  });
};




