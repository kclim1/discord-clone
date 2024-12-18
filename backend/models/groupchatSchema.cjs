const mongoose = require("mongoose");

const groupchatSchema = new mongoose.Schema(
  {
    serverId: { 
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
  },
  { timestamps: true } 
);

module.exports = mongoose.model("GroupChat", groupchatSchema);
