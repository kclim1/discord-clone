const express = require('express')
const router = express.Router()
const chatController = require('../controllers/messageController.cjs')



router.post('/friend-requests/:profileId', chatController.sendFriendRequest); 
router.post('/new-chat',chatController.createNewChat)
router.get('/chats/:profileId',chatController.getAllChat)  //fetches all chat user is involved in 
router.get('/friends/:profileId', chatController.getFriends); 
router.get('/friends/:friendId', chatController.getFriendById);
router.patch('/friends/:profileId',chatController.acceptFriendRequest)
router.delete('/friends/:profileId',chatController.rejectFriendRequest)

module.exports = router 

