const express = require('express')
const passport = require('passport')
const router = express.Router()

//google routes start 
router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );
  router.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    function (req, res) {
      console.log("login succesful");
      res.send("google login succesful");
    //   res.redirect('http://localhost:5173/');
    }
  );


  //google routes end 

  //github routes start 


  router.get('/auth/github',
    passport.authenticate('github', { scope: [ 'user:email' ] }));
  
  router.get('/auth/github/callback', 
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.send('github login succesful')
    });


    //github routes end

module.exports = router 