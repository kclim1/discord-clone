const mongoose = require("mongoose");
const User = require('./userSchema.cjs')

const MessageSchema = new mongoose.Schema(
  {
    senderId: {
      type: String, 
      ref: "User",
      required: true,
    },
    chatId:{
      type : String,
      ref:"SoloChat"
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
