const express = require("express");
const passport = require("passport");
const router = express.Router();
const mainController = require("../controllers/mainController.cjs");
const { formValidator } = require("../validators/formValidator");
const isAuthenticated = require("../middleware/isAuthenticated.cjs");

require("dotenv").config();

//google routes start
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: true }), // Only authenticate here
  (req, res) => {
    if (req.user) {
      res.redirect(`${process.env.BASE_URL}/dashboard/${req.user.profileId}`);
    } else {
      return res.status(401).json({ message: "Google login failed" });
    }
  }
);

//google routes end

//github routes start
router.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/auth/github/callback",
  passport.authenticate("github", { session: true }),
  (req, res) => {
    if (req.user) {
      // console.log('github login success')
      res.redirect(`${process.env.BASE_URL}/dashboard/${req.user.profileId}`);
      // return res.status(200).json({message:"github login successful"})
    } else {
      // console.log('github login success')
      return res
        .status(401)
        .json({ message: "github login failed ", user: req.user });
    }
  }
);

//github routes end

//local auth starts
router.post(
  "/auth/login",
  passport.authenticate("local", { failureRedirect: false }),
  (req, res) => {
    console.log("local strat success");
    res.redirect(`${process.env.BASE_URL}/dashboard/${req.user.profileId}`);
    // return res.status(200).json({ message: 'Local login successful' });
  },
  (err, req, res, next) => {
    console.log("local strat failed");
    return res.status(401).json({ message: "Login failed" });
  }
);

router.post("/signup", formValidator, mainController.signup);

// refactor later

// router.get('/profile',isAuthenticated , mainController.getProfile)
// /Dashboard/profilepage  => handle in frontend
router.get("/user/:profileId", mainController.getProfile);  //same resources as below. change to dahsboard 
router.put("/dashboard/:profileid", mainController.updateProfile);
router.post("/auth/logout", mainController.logout);
router.get("/auth/session", mainController.checkSession);

module.exports = router;
