const User = require("../models/userSchema.cjs");
const axios = require("axios");
const Solochat = require("../models/soloChatSchema.cjs");
const crypto = require("crypto");
const { io } = require("../socket.cjs"); // Import io from socket.js

// this saves sender's username profileId and profilePic inside recipient's friends array.
// also saves recipients data in senders friends list.


exports.sendFriendRequest = async (req, res) => {
  try {
    const { senderId, receiverId, username, profilePic } = req.body;

    if (!senderId || !receiverId) {
      return res
        .status(400)
        .json({ message: "Sender and receiver IDs are required." });
    }

    // Check if the receiver exists
    const receiver = await User.findOne({ profileId: receiverId });
    if (!receiver) {
      return res.status(404).json({ message: "ReceiverId not found." });
    }

    // Check if the sender exists
    const sender = await User.findOne({ profileId: senderId });
    if (!sender) {
      return res.status(404).json({ message: "SenderId not found." });
    }

    // Prevent sending a friend request to oneself
    if (senderId === receiverId) {
      return res
        .status(400)
        .json({ message: "You can't send a friend request to yourself." });
    }

    // Check if a friend request already exists for the receiver
    const alreadyRequestedReceiver = receiver.friends.some(
      (friend) => friend.senderId === senderId && friend.status === "pending"
    );
    if (alreadyRequestedReceiver) {
      return res
        .status(400)
        .json({ message: "Friend request already sent to receiver." });
    }

    // Add the friend request to the receiver's friends list
    receiver.friends.push({
      senderId, // Explicitly add senderId
      receiverId,
      username,
      profilePic,
      status: "pending",
    });
    await receiver.save();

    // Add the friend request to the sender's friends list
    sender.friends.push({
      receiverId,
      senderId,
      username: receiver.username,
      profilePic: receiver.profilePic,
      status: "pending",
    });
    await sender.save();

    // Emit event to notify clients
    io.to(receiverId).emit("friendRequestSent", {
      senderId,
      username,
      profilePic,
      status: "pending",
    });
    console.log('Emitted friendRequestSent event:', { senderId, receiverId, username, profilePic });

    console.log(
      `${sender.username} sent a friend request to ${receiver.username}`
    );
    return res.status(200).json({
      message: "Friend request sent successfully.",
      senderId: senderId
    });
  } catch (error) {
    console.error("Error sending friend request:", error);
    res
      .status(500)
      .json({ message: "An error occurred while sending the friend request." });
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
    console.log("This is the user:", profileId);

    const chats = await Solochat.find({
      participants: profileId,
    });

    if (!chats || chats.length === 0) {
      return res.status(404).json({ message: "No chats found for this user." });
    }
    console.log("this is chats backend", chats);
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
