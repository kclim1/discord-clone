const express = require("express");
const app = express();
require("dotenv").config();
const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
const router = require("express-router");
const expressValidator = require("express-validator");
const path = require("path");
const bcryptjs = require("bcryptjs");
const mongooseConnect = require("./models/mongooseConnect.cjs");
const mongoose = require("mongoose");
const User = require("./models/userSchema.cjs");
const port = 3000;
const passport = require("passport");
const sessionMiddleware = require("./middleware/sessionMiddleware.cjs");
const serializeUser = require("./passport/serializeUser.cjs");
const deserializeUser = require("./passport/deserializeUser.cjs");
const cors = require("./middleware/corsConfig.cjs");
const googleStrategy = require("./passport/googleStrategy.cjs");
const localStrategy = require("./passport/localStrategy.cjs");
const githubStrategy = require("./passport/githubStrategy.cjs");
const authRoutes = require("./routes/authRoutes.cjs");  
const messageRoutes = require('./routes/messageRoutes.cjs')

// Connect mongoose
mongooseConnect();

//cors moved to corsConfig.js
app.use(cors);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
// Passport serialization and deserialization
serializeUser();
deserializeUser();
//serialize and deserialize user moved to passport/serializeUser.js

// Set up session handling with MongoDB store
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

// Set up Google OAuth Strategy with Passport
googleStrategy();
//google strat moved to googleStrategy.js
githubStrategy();
localStrategy();
//routes moved to auth routes
app.use(authRoutes);
app.use(messageRoutes)

io.on("connection", (socket) => {
  console.log(`User has connected: ${socket.id}`);

  socket.on("sendMessage", ({ room, message, sender }) => {
    console.log(`Message received in room ${room} from ${sender}: ${message}`);
    io.to(room).emit("receiveMessage", { sender, message });
  });


  socket.on("sendMessage", ({ room, message }) => {
    console.log(`Message received in room ${room}: ${message}`);
    io.to(room).emit("receiveMessage", { sender: socket.id, message });
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

