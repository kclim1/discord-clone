const cloudinary = require('cloudinary').v2;
const path = require('path');
require("dotenv").config();
const mongoose = require('mongoose')
const User = require('../models/userSchema.cjs')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true, 
});


// Test Cloudinary connection by uploading an image
const testCloudinaryConnection = async (req,res) => {
  try {
    const imagePath = path.resolve(__dirname, '../public/avatar.png');    
    const sample = await cloudinary.uploader.upload(imagePath);
    console.log(sample.secure_url)
  } catch (error) {
    console.error('Cloudinary upload failed:', error.message );
  }
};

// Call the test function
testCloudinaryConnection();


  