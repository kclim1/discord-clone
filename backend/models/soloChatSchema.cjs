const mongoose = require("mongoose");

const soloChatSchema = new mongoose.Schema(
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
    serverName: {
      type: String,
    },
    serverPicture: {
      type: String,
    },
  },
  { timestamps: true } 
);

module.exports = mongoose.model("SoloChat", soloChatSchema);
