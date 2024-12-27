const socketIo = require("socket.io");

let io; // Declare io as undefined initially

// Initialize Socket.IO and attach to the server
const initializeSocket = (server) => {
  io = socketIo(server, {
    cors: {
      origin: "http://localhost:5173", // Update to match your frontend URL
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("joinRoom", (profileId) => {
      socket.join(profileId);
      console.log(`User with profileId ${profileId} joined room.`);
    });

    socket.on("sendMessage", ({ room, message, sender }) => {
      console.log(`Message received in room ${room} from ${sender}: ${message}`);
      io.to(room).emit("receiveMessage", { sender, message });
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  return io;
};

// Get the Socket.IO instance
const getSocketInstance = () => {
  if (!io) {
    throw new Error("Socket.IO has not been initialized. Call initializeSocket first.");
  }
  return io;
};

module.exports = { initializeSocket, getSocketInstance };