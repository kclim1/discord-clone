const express = require('express');
const app = express()
const http = require("http");
const server = http.createServer(app);
const socketIo = require("socket.io");



const io = socketIo(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User has connected to socket: ${socket.id}`);

  socket.on("sendMessage", ({ room, message, sender }) => {
    console.log(`Message received in room ${room} from ${sender}: ${message}`);
    io.to(room).emit("receiveMessage", { sender, message });
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected from socket: ${socket.id}`);
  });
});

module.exports = { io,app, server };