const User = require("../models/userSchema.cjs");
const axios = require("axios");
const { getSocketByUserId, emitToUser } = require("../socket.cjs");
const crypto = require("crypto");
const SoloChat = require('../models/solochatschema.cjs');

const validateUser = async (profileId) => {
  const user = await User.findOne({ profileId });
  if (!user) {
    throw new Error(`User with profileId ${profileId} not found`);
  }
  return user;
};


exports.sendFriendRequest = async (req, res) => {
  try {
    const { senderId, receiverId, username, profilePic } = req.body;
    const { profileId } = req.params;

    if (!senderId || !receiverId) {
      return res.status(400).json({ message: "Sender and receiver IDs are required." });
    }

    if (senderId === receiverId) {
      return res.status(400).json({ message: "You cannot send a friend request to yourself." });
    }

    const sender = await User.findOne({ profileId: senderId });
    const receiver = await User.findOne({ profileId: receiverId });

    if (!sender || !receiver) {
      return res.status(404).json({ message: "Sender or receiver not found." });
    }

    // Check if a pending request or friendship already exists
    const requestExists = receiver.friends.some(
      (friend) => friend.senderId === senderId && friend.status === "pending"
    );

    if (requestExists) {
      return res.status(400).json({ message: "Friend request already sent." });
    }

    receiver.friends.push({
      senderId, // ID of the user sending the request
      receiverId, // ID of the receiver (current user)
      username, // Sender's username
      profilePic, // Sender's profile picture
      status: "pending", // Request status
    });
    
    sender.friends.push({
      senderId, // ID of the sender (current user)
      receiverId, // ID of the receiver
      username: receiver.username, // Receiver's username
      profilePic: receiver.profilePic, // Receiver's profile picture
      status: "pending", // Request status
    });
    console.log(`${receiverId} received a friend request from ${senderId}`);
    await receiver.save();
    await sender.save();

    emitToUser(receiverId, "friendRequestReceived", {
      senderId,
      username,
      profilePic,
      status: "pending",
    });
    emitToUser(senderId, "friendRequestSent", {
      senderId,
      username,
      profilePic,
      status: "pending",
    });


    return res.status(200).json({ message: "Friend request sent successfully." });
  } catch (error) {
    console.error("Error sending friend request:", error.message);
    res.status(500).json({ message: "Failed to send friend request." });
  }
};

// fetches the friends list from user document. this array is filtered in friends page into pending and accepted

exports.getFriends = async (req, res) => {
  try {
    const { profileId } = req.params;

    if (!profileId) {
      return res.status(400).json({ message: "Profile ID is required." });
    }

    // Find the user by profileId
    const user = await User.findOne({ profileId });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    return res.status(200).json(user.friends);
  } catch (error) {
    console.error("Error fetching friends:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching friends." });
  }
};

exports.acceptFriendRequest = async (req, res) => {
  try {
    const { friendId } = req.body;

    if (!friendId) {
      return res.status(400).json({ message: "FriendId is required." });
    }

    // Step 1: Locate the friend request in the receiver's document
    const receiver = await User.findOne({ "friends._id": friendId }, { "friends.$": 1 });

    if (!receiver) {
      return res.status(404).json({ message: "Friend request not found." });
    }

    // Extract the senderId and receiverId from the friend object
    const friendRequest = receiver.friends[0];
    const { senderId, receiverId } = friendRequest;

    console.log(`Found friend request: ${friendRequest}`);

    // Step 2: Update the receiver's friend object
    const updateReceiver = await User.updateOne(
      { "friends._id": friendId },
      { $set: { "friends.$.status": "accepted" } }
    );

    if (updateReceiver.matchedCount === 0) {
      return res.status(404).json({ message: "Failed to update receiver's friend status." });
    }

    // Step 3: Update the sender's friend object
    const updateSender = await User.updateOne(
      {
        profileId: senderId, // Locate the sender
        "friends.senderId": senderId,
        "friends.receiverId": receiverId,
      },
      { $set: { "friends.$.status": "accepted" } }
    );

    if (updateSender.matchedCount === 0) {
      return res.status(404).json({ message: "Failed to update sender's friend status." });
    }

    console.log(`Friend request ${friendId} accepted for both sender and receiver.`);

    // Step 4: Respond with success
    res.status(200).json({
      message: "Friend request accepted for both sender and receiver.",
    });
  } catch (error) {
    console.error("Error accepting friend request:", error.message);
    res.status(500).json({
      message: "An error occurred while accepting the friend request.",
    });
  }
};



exports.rejectFriendRequest = async (req, res) => {
  try {
    const { friendId } = req.body;

    if (!friendId) {
      return res.status(400).json({ message: "FriendId is required." });
    }

    // Step 1: Locate the friend request in the receiver's document
    const receiver = await User.findOne({ "friends._id": friendId }, { "friends.$": 1 });

    if (!receiver) {
      return res.status(404).json({ message: "Friend request not found." });
    }

    // Extract the senderId and receiverId from the friend object
    const friendRequest = receiver.friends[0];
    const { senderId, receiverId } = friendRequest;

    console.log(`Found friend request to reject: ${friendRequest}`);

    // Step 2: Remove the friend request from the receiver's `friends` array
    const updateReceiver = await User.updateOne(
      { "friends._id": friendId },
      { $pull: { friends: { _id: friendId } } }
    );

    if (updateReceiver.matchedCount === 0) {
      return res.status(404).json({ message: "Failed to update receiver's friend list." });
    }

    // Step 3: Remove the friend request from the sender's `friends` array
    const updateSender = await User.updateOne(
      {
        profileId: senderId,
        "friends.senderId": senderId,
        "friends.receiverId": receiverId,
      },
      { $pull: { friends: { senderId, receiverId } } }
    );

    if (updateSender.matchedCount === 0) {
      return res.status(404).json({ message: "Failed to update sender's friend list." });
    }

    console.log(`Friend request ${friendId} rejected and removed for both sender and receiver.`);

    // Step 4: Respond with success
    res.status(200).json({
      message: "Friend request rejected and removed for both sender and receiver.",
    });
  } catch (error) {
    console.error("Error rejecting friend request:", error.message);
    res.status(500).json({
      message: "An error occurred while rejecting the friend request.",
    });
  }
};




exports.createNewChat = async (req, res) => {
  try {
    const profileId = req.params.profileId; // The user initiating the chat
    const { participants } = req.body;

    console.log("this is the req body", req.body);

    // Validation: Ensure there are at least two participants
    if (participants.length < 2) {
      return res
        .status(400)
        .json({ error: "At least two participants are required" });
    }

    // Validation: Ensure no participant ID is an empty string
    if (participants.some((participant) => participant.trim() === "")) {
      return res.status(400).json({ error: "Cannot submit empty string!! " });
    }

    // Generate a unique chatId
    const chatId = crypto.randomBytes(8).toString("hex");

    // Fetch details of both participants
    const [participant1Id, participant2Id] = participants;
    const participant1 = await User.findOne({ profileId: participant1Id });
    const participant2 = await User.findOne({ profileId: participant2Id });

    if (!participant1 || !participant2) {
      return res
        .status(404)
        .json({ error: "One or more participants not found" });
    }

    // Create a new chat
    const chat = new SoloChat({
      chatId,
      participants,
    });

    console.log("this is the createchat backend", chat);
    await chat.save();


    participants.forEach((participantId) => {
      emitToUser(participantId, "newChatCreated", { chat });
      console.log(`Emitting newChatCreated to participantId: ${participantId}`);
    });

    return res.status(201).json({ chat , participants});
  } catch (error) {
    console.error("Error creating chat:", error);
    return res.status(500).json({ error: "Failed to create chat" });
  }
};


exports.getAllChat = async (req, res) => {
  try {
    const profileId = req.params.profileId;
    // console.log("This is the user:", profileId);

    const chats = await SoloChat.find({
        participants: profileId,
    });

    if (!chats || chats.length === 0) {
      return res.status(404).json({ message: "No chats found for this user." });
    }
    // console.log("this is chats backend", chats);
    res.status(200).json(chats);
  } catch (error) {
    console.error("Error fetching all chats:", error);
    res.status(500).json({ error: "Failed to fetch chats. Please try again." });
  }
};


exports.getFriendById = async (req, res) => {
  try {
    const {profileId} = req.params
    const { participantId } = req.body; // Extract the participantId from the route parameters
    console.log("Fetching profile for participantId:", profileId);

    // Query the User collection for the participant's profile
    const participantProfile = await User.findOne({ profileId: participantId }); 

    if (participantProfile) {
      return res.status(200).json(participantProfile);
    }
    return res.status(404).json({ message: "Participant profile not found" });
  } catch (error) {
    console.error("Error fetching participant profile:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

