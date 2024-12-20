const mongoose = require('mongoose')
const directMessageSchema = new mongoose.Schema(
  {
    dmId: { type: String, unique: true }, // Unique identifier for the DM room
    roomName: { type: String }, // Optional room name
    participants: [
      { type: String, ref: "User", unique: true }, // Array of user references
    ],
    type: { type: String, enum: ["group", "direct"], default: "direct" }, // Differentiates between group and DM
  },
  { timestamps: true } 
);

module.exports = mongoose.model("DMRoom", directMessageSchema);
