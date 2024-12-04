const express = require("express");
const app = express();
require("dotenv").config();
const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);
const io = socketIo(server);
const router = require("express-router");
const expressValidator = require("express-validator");
const path = require("path");
const bcryptjs = require('bcryptjs')
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
const localStrategy = require('./passport/localStrategy.cjs')
const githubStrategy = require("./passport/githubStrategy.cjs");
const authRoutes = require('./routes/authRoutes.cjs')


// Connect mongoose
mongooseConnect();

//cors moved to corsConfig.js
app.use(cors);
app.use(express.json());
// Passport serialization and deserialization
serializeUser();
deserializeUser();
//serialize and deserialize user moved to passport/serializeUser.js

// Set up session handling with MongoDB store
app.use(sessionMiddleware);

// Set up Google OAuth Strategy with Passport
googleStrategy()
//google strat moved to googleStrategy.js
githubStrategy()
localStrategy()
//routes moved to auth routes
app.use(authRoutes)

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

