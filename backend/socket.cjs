const socketIo = require("socket.io");

let io; // Declare io as undefined initially
const userSockets = new Map(); // Map<profileId, Set<socketId>>

// Initialize Socket.IO and attach to the server
const initializeSocket = (server) => {
  io = socketIo(server, {
    cors: {
      origin: `${process.env.FRONTEND_ROUTE}`, 
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {

    // Register the user's profileId and associate with their socket
    socket.on("register", (profileId) => {

      // Add the socket to the user's set of sockets
      if (userSockets.has(profileId)) {
        userSockets.get(profileId).add(socket.id);
      } else {
        userSockets.set(profileId, new Set([socket.id]));
      }
    });

    // Handle joining a specific room (optional, based on your use case)
    socket.on("joinRoom", (profileId) => {
      socket.join(profileId);
    });

    // Handle disconnection and clean up mapping
    socket.on("disconnect", () => {

      // Remove the socket from the user's entry in the Map
      for (const [profileId, sockets] of userSockets.entries()) {
        if (sockets.has(socket.id)) {
          sockets.delete(socket.id);
          if (sockets.size === 0) {
            userSockets.delete(profileId); // Remove profileId if no sockets remain
          }
          break;
        }
      }
    });
  });

  return io;
};

// Retrieve a socket by userId (profileId)
const getSocketByUserId = (profileId) => {
  const sockets = userSockets.get(profileId);
  if (!sockets || sockets.size === 0) {
    console.log(`No active sockets for profileId: ${profileId}`);
    return null; // No active sockets for this user
  }
  // Return an array of socket IDs (or the first one if you only need one)
  return Array.from(sockets);
};

// Get the Socket.IO instance
const getSocketInstance = () => {
  if (!io) {
    throw new Error("Socket.IO has not been initialized. Call initializeSocket first.");
  }
  return io;
};

// Utility function to emit to a specific user
const emitToUser = (profileId, event, data) => {
  const sockets = getSocketByUserId(profileId);
  if (sockets) {
    const io = getSocketInstance();
    sockets.forEach((socketId) => {
      io.to(socketId).emit(event, data);
    });
  } else {
    console.log(`No active sockets for user with ID: ${profileId}`);
  }
};

module.exports = { initializeSocket, getSocketInstance, getSocketByUserId, emitToUser};