const mongoose = require("mongoose");

const DirectMessageSchema = new mongoose.Schema(
  {
    chatId : { 
      type: String,
      required: true,
      unique: true, 
    },
    participants: {
      type: [String], 
      required: true,
    },
  },
  { timestamps: true } 
);

module.exports = mongoose.model("DMChat", groupchatSchema);
