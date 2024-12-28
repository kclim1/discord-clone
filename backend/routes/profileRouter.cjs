// routes/profileRouter.js
const express = require('express');
const profileRouter = express.Router();
const profileController = require('../controllers/profileController.cjs');

// Let express know to use loadUserByProfileId whenever ':profileId' is present
profileRouter.param('profileId', profileController.loadUserByProfileId);

// Example main profile route
profileRouter.get('/:profileId', profileController.getProfile);

// Create a separate Router for friends
const friendsRouter = express.Router({ mergeParams: true });
friendsRouter.get('/', profileController.getFriends);
friendsRouter.get('/:friendId', profileController.getFriendById);

// Attach friendsRouter to /profiles/:profileId/friends
profileRouter.use('/:profileId/friends', friendsRouter);

module.exports = profileRouter;


// profiles/id...
// profiles/id/friends/id...

// chat router
// get chat: get profiles/id/chats/id
// create new chat: post profiles/id/chats (in the body, all additional participants)

// friends router
// profiles/id/friend-requests/
// profiles/id/friend-requests/id


// friend request router
// get: get profiles/id/friend-requests/id
// accept one: post profiles/id/friend-requests/id/accept
// decline one: post profiles/id/friend-requests/id/decline

