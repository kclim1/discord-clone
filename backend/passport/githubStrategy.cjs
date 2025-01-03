const passport = require("passport");
const GitHubStrategy = require("passport-github2");
const User = require("../models/userSchema.cjs");
const axios = require("axios");
require("dotenv").config()

const githubStrategy = () => {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/github/callback",
        callbackURL: `${process.env.BACKEND_ROUTE}/auth/github/callback`,
        scope: ["user:email"],
      },
      async function (accessToken, refreshToken, profile, cb) {
        try {
          let email = null;
          const fetchEmail = await axios.get(
            "https://api.github.com/user/emails",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "User-Agent": "discord-clone",
              },
            }
          );
        
          email = fetchEmail.data[0].email;
          let githubUser = await User.findOne({ profileId: profile.id });
          if (!githubUser) {
            githubUser = await User.create({
              profileId: profile.id,
              username: profile.username,
              email: email,
              friends: [],
              isOnline: false,
              profilePic: ""
            });
          }
          cb(null, githubUser);
        } catch (error) {
          console.error(error);
          cb(error);
        }
      }
    )
  );
};

module.exports = githubStrategy;
