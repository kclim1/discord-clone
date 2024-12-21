const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const User = require("../models/userSchema.cjs");

const googleStrategy = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENTID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, cb) => {
        try {
          console.log("profile id : ", profile.id);
          let googleUser = await User.findOne({ profileId: profile.id });
          if (!googleUser) {
            googleUser = await User.create({
              profileId: profile.id,
              username: profile.displayName,
              email: profile.emails[0].value,
              familyName: profile.name.familyName,
              givenName: profile.name.givenName,
              loginTime: Date.now(),
              friends: [],
              isOnline: false,
              profilePic: ""
            });

            await googleUser.save();
          }
          console.log("google auth done");
          cb(null, googleUser);
        } catch (error) {
          cb(error);
        }
      }
    )
  );
};

module.exports = googleStrategy;
