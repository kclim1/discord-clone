const User = require('../models/userSchema.cjs')
const axios = require('axios')


// this saves sender's username profileId and profilePic inside recipient's friends array.
// also saves recipients data in senders friends list. 
exports.sendFriendRequest = async (req, res) => {
  try {
    const { senderId, receiverId, username, profilePic } = req.body;

    if (!senderId || !receiverId) {
      return res.status(400).json({ message: "Sender and receiver IDs are required." });
    }

    // Check if the receiver exists
    const receiver = await User.findOne({ profileId: receiverId });
    if (!receiver) {
      return res.status(404).json({ message: "Receiver not found." });
    }

    // Check if the sender exists
    const sender = await User.findOne({ profileId: senderId });
    if (!sender) {
      return res.status(404).json({ message: "Sender not found." });
    }

    // Prevent sending a friend request to oneself
    if (senderId === receiverId) {
      return res.status(400).json({ message: "You can't send a friend request to yourself." });
    }

    // Check if a friend request already exists for the receiver
    const alreadyRequestedReceiver = receiver.friends.some(
      (friend) => friend.senderId === senderId && friend.status === "pending"
    );
    if (alreadyRequestedReceiver) {
      return res.status(400).json({ message: "Friend request already sent to receiver." });
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

    console.log(`${sender.username} sent a friend request to ${receiver.username}`);
    return res.status(200).json({ message: "Friend request sent successfully." });
  } catch (error) {
    console.error("Error sending friend request:", error);
    res.status(500).json({ message: "An error occurred while sending the friend request." });
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
      res.status(500).json({ message: "An error occurred while fetching friends." });
    }
  };

  exports.acceptFriendRequest = async (req, res) => {
    try {
      const { profileId } = req.params; // Recipient's profile ID
      
      const { receiverId, username , profilePic } = req.body;
  

      console.log("Sender and receiver ID here:", senderId, receiverId);
  
      if (!profileId || !friendId || !senderId || !receiverId) {
        return res.status(400).json({
          message: "Profile ID, Friend ID, Sender ID, and Receiver ID are required.",
        });
      }
  
      // Find the recipient (user)
      const receiver = await User.findOne({ profileId: receiverId });
      if (!receiver) {
        return res.status(404).json({ message: "Receiver not found." });
      }
  
      // Find the sender (user who sent the friend request)
      const sender = await User.findOne({ profileId: senderId });
      if (!sender) {
        return res.status(404).json({ message: "Sender not found." });
      }
  
      // Update the receiver's friends list
      const receiverFriend = receiver.friends.find((f) => f.friendId === senderId);
      if (!receiverFriend || receiverFriend.status !== "pending") {
        return res.status(400).json({
          message: "No pending friend request found for this sender ID.",
        });
      }
      receiverFriend.status = "accepted";
      await receiver.save();
  
      // Update the sender's friends list
      const senderFriend = sender.friends.find((f) => f.friendId === receiverId);
      if (!senderFriend || senderFriend.status !== "pending") {
        return res.status(400).json({
          message: "No pending friend request found for this receiver ID.",
        });
      }
      senderFriend.status = "accepted";
      await sender.save();
  
      console.log(`Friend request from ${senderId} accepted by ${receiverId}`);
      return res.status(200).json({ message: "Friend request accepted successfully." });
    } catch (error) {
      console.error("Error accepting friend request:", error);
      res.status(500).json({
        message: "An error occurred while accepting the friend request.",
      });
    }
  };
  



exports.rejectFriendRequest = async (req, res) => {
  try {
    const { profileId } = req.params; // Recipient's profile ID
    const { friendId } = req.body; // Sender's profile ID from the request body

    if (!profileId || !friendId) {
      return res.status(400).json({ message: "Profile ID and Friend ID are required." });
    }

    // Find the recipient (user) and the friend request
    const user = await User.findOne({ profileId });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const friendIndex = user.friends.findIndex((f) => f.friendId === friendId && f.status === "pending");
    if (friendIndex === -1) {
      return res.status(400).json({ message: "No pending friend request found for this friend ID." });
    }

    // Remove the friend request from the friends array
    user.friends.splice(friendIndex, 1);
    await user.save();

    console.log(`Friend request from ${friendId} rejected by ${profileId}`);
    return res.status(200).json({ message: "Friend request rejected successfully." });
  } catch (error) {
    console.error("Error rejecting friend request:", error);
    res.status(500).json({ message: "An error occurred while rejecting the friend request." });
  }
};