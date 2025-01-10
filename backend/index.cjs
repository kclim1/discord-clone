const express = require("express");
const app = express();
require("dotenv").config();
const http = require("http");
const { initializeSocket } = require("./socket.cjs"); // Import the socket manager
const router = require("express-router");
const expressValidator = require("express-validator");
const path = require("path");
const bcryptjs = require("bcryptjs");
const mongooseConnect = require("./models/mongooseConnect.cjs");
const mongoose = require("mongoose");
const User = require("./models/userSchema.cjs");
const passport = require("passport");
const sessionMiddleware = require("./middleware/sessionMiddleware.cjs");
const serializeUser = require("./passport/serializeUser.cjs");
const deserializeUser = require("./passport/deserializeUser.cjs");
const cors = require("./middleware/corsConfig.cjs");
const googleStrategy = require("./passport/googleStrategy.cjs");
const localStrategy = require("./passport/localStrategy.cjs");
const githubStrategy = require("./passport/githubStrategy.cjs");
const authRoutes = require("./routes/authRoutes.cjs");
const messageRoutes = require("./routes/messageRoutes.cjs");
const profileRouter = require('./routes/profileRouter.cjs');

const server = http.createServer(app);

const PORT = process.env.PORT

// Connect mongoose
mongooseConnect();

// Middleware setup
app.use(cors);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Passport setup
serializeUser();
deserializeUser();

app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

// Set up Google, GitHub, and local OAuth Strategies
googleStrategy();
githubStrategy();
localStrategy();

// Routes
app.use(authRoutes);
app.use(messageRoutes);
app.use('/profiles', profileRouter);

// Initialize Socket.IO
initializeSocket(server);

// Serve front-end static files here
app.use(express.static(path.join(__dirname, "..", "frontend", "dist")));

// What happens when the public tries to access https://discord-clone-1-m1dy.onrender.com/
// This assumes /frontend has been built already
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "dist", "index.html"));
})

server.listen(PORT, () => {
  console.log(`Servers running on port ${PORT}`);
});


module.exports = {server , app}; 