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
    isOnline: {
      type: Boolean,
      default: false,
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
    },
    friends: [
      {
        receiverId : {type: String, ref: "User"},
        senderId: { type: String, ref: "User" },
        username: { type: String, ref: "User" },
        profilePic: { type: String, ref: "User" },
        status: {
          type: String,
          enum: ["pending", "accepted"],
          default: "pending",
        }, 
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
