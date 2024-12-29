const express = require('express')
const router = express.Router()
const messageController = require('../controllers/messageController.cjs')



router.post('/friend-requests/:profileId', messageController.sendFriendRequest); 
router.post('/new-chat',messageController.createNewChat)

router.post('/messages', messageController.sendMessage)
router.get('/mesages/:chatId',messageController.getAllMessages)

router.get('/chats/:profileId',messageController.getAllChat)  //fetches all chat user is involved in 
// router.get('/friends/:profileId', messageController.getFriends); 
// router.get('/friends', messageController.getFriendById); //fetches a specific friends user obj 
router.patch('/friends/:profileId',messageController.acceptFriendRequest)
router.delete('/friends/:profileId',messageController.rejectFriendRequest)



module.exports = router 

