const mongoose = require('mongoose')

const directMessageSchema = new mongoose.Schema(
  {
    dmId: { type: String },
    roomName: { type: String, required: false }, // Optional room name
    participants: [{ type: String, ref: "User" }], // Array of user references
  },
  { timestamps: true }
);

module.exports = mongoose.model("DMRoom", directMessageSchema);
