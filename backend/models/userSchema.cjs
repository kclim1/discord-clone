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
        friendId: { type: String, ref: "User" }, // Reference to the User model
        status: {
          type: String,
          enum: ["pending", "accepted"],
          default: "pending",
        }, // Friend status
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
