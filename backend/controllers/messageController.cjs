const User = require("../models/userSchema.cjs");
const axios = require("axios");
const { getSocketByUserId, emitToUser } = require("../socket.cjs");
const crypto = require("crypto");
const SoloChat = require("../models/soloChatSchema.cjs");
const Message = require("../models/messageSchema.cjs");

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
      return res
        .status(400)
        .json({ message: "Sender and receiver IDs are required." });
    }

    if (senderId === receiverId) {
      return res
        .status(400)
        .json({ message: "You cannot send a friend request to yourself." });
    }

    const sender = await User.findOne({ profileId: senderId });
    const receiver = await User.findOne({ profileId: receiverId });

    if (!sender || !receiver) {
      return res.status(404).json({ message: "Sender or receiver not found." });
    }

    // Check if a pending request or friendship already exists
    const requestExists = receiver.friends.some(
      (friend) => 
          (friend.senderId === senderId && friend.status === "pending") ||
          (friend.senderId === senderId && friend.status === "accepted")
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

    return res
      .status(200)
      .json({ message: "Friend request sent successfully." });
  } catch (error) {
    console.error("Error sending friend request:", error.message);
    res.status(500).json({ message: "Failed to send friend request." });
  }
};


exports.acceptFriendRequest = async (req, res) => {
  try {
    const { friendId } = req.body;

    if (!friendId) {
      return res.status(400).json({ message: "FriendId is required." });
    }

    // Step 1: Locate the friend request in the receiver's document
    const receiver = await User.findOne(
      { "friends._id": friendId },
      { "friends.$": 1 }
    );

    if (!receiver) {
      return res.status(404).json({ message: "Friend request not found." });
    }

    // Extract the senderId and receiverId from the friend object
    const friendRequest = receiver.friends[0];
    const { senderId, receiverId } = friendRequest;


    // Step 2: Update the receiver's friend object
    const updateReceiver = await User.updateOne(
      { "friends._id": friendId },
      { $set: { "friends.$.status": "accepted" } }
    );

    if (updateReceiver.matchedCount === 0) {
      return res
        .status(404)
        .json({ message: "Failed to update receiver's friend status." });
    }

    // Step 3: Update the sender's friend object
    const updateSender = await User.updateOne(
      {
        profileId: senderId, // Locate the sender's document
        "friends.receiverId": receiverId, // Match the receiver in the sender's friends list
      },
      { $set: { "friends.$.status": "accepted" } } // Update the matched friend's status
    );

    if (updateSender.matchedCount === 0) {
      return res
        .status(404)
        .json({ message: "Failed to update sender's friend status." });
    }



    // Step 4: Emit real-time updates to both users
    emitToUser(senderId, "friendRequestAccepted", {
      friendId,
      senderId,
      receiverId,
      status: "accepted",
    });

    emitToUser(receiverId, "friendRequestAccepted", {
      friendId,
      senderId,
      receiverId,
      status: "accepted",
    });

    // Step 5: Respond with success
    return res.status(200).json({
      message: "Friend request accepted for both sender and receiver.",
    });
  } catch (error) {
    console.error("Error accepting friend request:", error.message);
    return res.status(500).json({
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
    const receiver = await User.findOne(
      { "friends._id": friendId },
      { "friends.$": 1 }
    );

    if (!receiver) {
      return res.status(404).json({ message: "Friend request not found." });
    }

    // Extract the senderId and receiverId from the friend object
    const friendRequest = receiver.friends[0];
    const { senderId, receiverId } = friendRequest;


    // Step 2: Remove the friend request from the receiver's `friends` array
    const updateReceiver = await User.updateOne(
      { "friends._id": friendId },
      { $pull: { friends: { _id: friendId } } }
    );

    if (updateReceiver.matchedCount === 0) {
      return res
        .status(404)
        .json({ message: "Failed to update receiver's friend list." });
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
      return res
        .status(404)
        .json({ message: "Failed to update sender's friend list." });
    }

   

    // Step 4: Respond with success
    res.status(200).json({
      message:
        "Friend request rejected and removed for both sender and receiver.",
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
    await chat.save();

    participants.forEach((participantId) => {
      emitToUser(participantId, "newChatCreated", { chat });
    });

    return res.status(201).json({ chat, participants });
  } catch (error) {
    console.error("Error creating chat:", error);
    return res.status(500).json({ error: "Failed to create chat" });
  }
};

exports.getAllChat = async (req, res) => {
  try {
    const profileId = req.params.profileId;

    // Fetch chats where the profileId is a participant
    const chats = await SoloChat.find({
      participants: profileId,
    });

    // Return the chats to the frontend
    res.status(200).json(chats);
  } catch (error) {
    console.error("Error fetching all chats:", error);
    res.status(500).json({ error: "Failed to fetch chats. Please try again." });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { senderId, text, chatId } = req.body;

    if (!text.trim()) {
      return res.status(400).json({ message: "Cannot send an empty string" });
    }

    // Find the sender's details
    const sender = await User.findOne({ profileId: senderId }).select(
      "username profilePic"
    );
    if (!sender) {
      return res.status(404).json({ message: "Sender not found" });
    }

    // Create and save the message
    const newMessage = new Message({
      senderId,
      text,
      chatId,
    });
    const savedMessage = await newMessage.save();

    // Fetch the chat participants
    const chat = await SoloChat.findOne({ chatId }).select("participants");
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    // Notify all participants except the sender
    chat.participants.forEach((participantId) => {
      emitToUser(participantId, "messageSent", {
        senderId,
        text,
        chatId,
        createdAt: savedMessage.createdAt,
        sender: {
          username: sender.username,
          profilePic: sender.profilePic,
        },
      });
    });

    // Respond to the sender with the saved message
    res.status(201).json({
      message: {
        _id: savedMessage._id,
        senderId,
        text,
        chatId,
        createdAt: savedMessage.createdAt,
        sender: {
          username: sender.username,
          profilePic: sender.profilePic,
        },
      },
    });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//data used to render chat UI component.
exports.getAllMessages = async (req, res) => {
  try {
    const { chatId } = req.params;

    // Fetch messages for the chatId
    const allMessages = await Message.find({ chatId }).sort({ createdAt: 1 });

    // If no messages are found, return an empty response
    if (!allMessages || allMessages.length === 0) {
      return res.status(200).json({ allMessages: [] });
    }

    // Map through allMessages and attach sender details
    const messagesWithSenderDetails = await Promise.all(
      allMessages.map(async (message) => {
        const sender = await User.findOne({
          profileId: message.senderId,
        }).select("username profilePic");
        return {
          ...message.toObject(),
          sender: sender || { username: "Unknown", profilePic: "/avatar.png" },
        };
      })
    );

    res.status(200).json({ allMessages: messagesWithSenderDetails });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
