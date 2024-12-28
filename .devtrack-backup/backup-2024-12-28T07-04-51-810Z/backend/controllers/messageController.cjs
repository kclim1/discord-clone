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

    // if (requestExists) {
    //   return res.status(400).json({ message: "Friend request already sent." });
    // }

    // Add the friend request to both sender and receiver
    receiver.friends.push({ senderId, username, profilePic, status: "pending" });
    sender.friends.push({
      receiverId,
      username: receiver.username,
      profilePic: receiver.profilePic,
      status: "pending",
    });

    await receiver.save();
    await sender.save();

    emitToUser(receiverId, "friendRequestSent", {
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

exports.acceptFriendRequest = async(req,res)=>{
  try{
    const {profileId} = req.params;
    const {friendList} = req.body
    console.log('this is the friend list', friendList)

  }catch(error){
    console.error(error)
    res.status(500).json({message:"An error occurred while accepting the friend request."})
  }
}
  


exports.rejectFriendRequest = async (req, res) => {
  try {
    const { profileId } = req.params; // Recipient's profile ID
    const { friendId } = req.body; // Sender's profile ID from the request body

    if (!profileId || !friendId) {
      return res
        .status(400)
        .json({ message: "Profile ID and Friend ID are required." });
    }

    // Find the recipient (user) and the friend request
    const user = await User.findOne({ profileId });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const friendIndex = user.friends.findIndex(
      (f) => f.friendId === friendId && f.status === "pending"
    );
    if (friendIndex === -1) {
      return res.status(400).json({
        message: "No pending friend request found for this friend ID.",
      });
    }

    // Remove the friend request from the friends array
    user.friends.splice(friendIndex, 1);
    await user.save();

    console.log(`Friend request from ${friendId} rejected by ${profileId}`);
    return res
      .status(200)
      .json({ message: "Friend request rejected successfully." });
  } catch (error) {
    console.error("Error rejecting friend request:", error);
    res.status(500).json({
      message: "An error occurred while rejecting the friend request.",
    });
  }
};

//creates new one to one chat or group chat
exports.createNewChat = async (req, res) => {
  try {
    const profileId = req.params.profileId;
    const { participants } = req.body;
    console.log("this is the req body", req.body);
    if (participants.length < 2) {
      return res
        .status(400)
        .json({ error: "At least two participants are required" });
    }
    if (participants.some((participant) => participant.trim() === "")) {
      return res.status(400).json({ error: "Cannot submit empty string!! " });
    }

    // Generate a unique chatId
    const chatId = crypto.randomBytes(8).toString("hex");
    const otherParticipantId = participants.find((id) => id !== profileId);
    const otherParticipant = await User.findOne({
      profileId: otherParticipantId,
    });
    // Create a new chat
    chat = new Solochat({
      chatId,
      participants,
      serverName: otherParticipant.username,
      serverPicture: otherParticipant.profilePic,
    });
    console.log("this is the createchat backend", chat);
    await chat.save();
    return res.status(201).json({ chat });
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
    const { friendId } = req.params;
    console.log("this is the friend id ", friendId);

    const findFriend = await User.findOne({ profileId: friendId }).select(
      "profileId username profilePicture"
    ); // Query based on profileId and return selected fields

    if (findFriend) {
      return res.status(200).json({ friend: findFriend });
    }

    return res.status(404).json({ message: "Friend not found" }); // Handle case when friend is not found
  } catch (error) {
    console.error("Error fetching friend:", error);
    return res.status(500).json({ error: "Internal server error" }); // Handle server errors
  }
};
