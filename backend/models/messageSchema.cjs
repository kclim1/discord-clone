const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    senderId: {
      type: String, // Storing as string
      ref: "User",
      required: true,
    },
    receiverId: {
      type: String, // Storing as string
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      trim: true,
      default: "",
    },
    image: {
      type: String,
      default: null,
    },
    messageType: {
      type: String,
      enum: ["text", "image", "gif", "system"], // Explicit message types
      default: "text",
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;
