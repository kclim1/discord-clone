// controllers/messageController.cjs
const User = require("../models/userSchema.cjs");
const SoloChat = require('../models/solochatschema.cjs');
const crypto = require("crypto");
const { emitToUser } = require("../socket.cjs");

/**
 * Middleware: Loads user from DB by :profileId. 
 * Attach found user to req.profile or respond 404 if not found.
 */
exports.loadUserByProfileId = async (req, res, next, profileId) => {
  try {
    const user = await User.findOne({ profileId });
    if (!user) {
      return res.status(404).json({ message: `User with profileId ${profileId} not found.` });
    }
    req.profile = user;
    next();
  } catch (error) {
    console.error("Error loading user by profileId:", error);
    return res.status(500).json({ message: "Server error while loading user." });
  }
};

/**
 * Simple route to return the loaded user profile (attached to req.profile).
 */
exports.getProfile = async (req, res) => {
  try {
    return res.status(200).json(req.profile);
  } catch (error) {
    console.error("Error getting profile:", error);
    return res.status(500).json({ message: "Error fetching profile" });
  }
};

/**
 * Lists a user's entire list of friends from their user doc (pending and accepted).
 * Uses req.profile (already loaded from DB).
 */
exports.getFriends = async (req, res) => {
    try {
      if (!req.profile) {
        return res.status(404).json({ message: "User not found." });
      }
      return res.status(200).json(req.profile.friends || []);
    } catch (error) {
      console.error("Error fetching friends:", error);
      return res.status(500).json({ message: "An error occurred while fetching friends." });
    }
  };

/**
 * Retrieve a single friend object by friendId or something similar.
 * For example, you might pass ?friendId=someId or put it in the route path.
 */
exports.getFriendById = async (req, res) => {
    try {
      const friendId = req.params.friendId || req.query.friendId;
      if (!req.profile) {
        return res.status(404).json({ message: "User not found." });
      }

  
      // In your original code, you had participantId in the body. 
      // This is an example approach to find a friend from the user's friend array:
      const friend = req.profile.friends.find((f) => String(f.senderId) === friendId);
      if (!friend) {
        return res.status(404).json({ message: "Friend not found in this user's friend list." });
      }

  
      return res.status(200).json(friend);
    } catch (error) {
      console.error("Error fetching friend by ID:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };