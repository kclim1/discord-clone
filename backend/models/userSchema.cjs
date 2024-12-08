const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    email: {
      type: String,
    },
    profileId: {
      type: String,
      unique: true,
    },
    loginTime: {
      type: Date,
      default: Date.now(),
    },
    dateCreated: {
      type: Date,
      default: Date.now(),
    },
    givenName: {
      type: String,
    },
    familyName: {
      type: String,
    },
    profilePic: {
      type: String,
      default: "https://res.cloudinary.com/ddbmpybzn/image/upload/v1733640886/jl6gr4ibn7xruihlck22.png" ,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
