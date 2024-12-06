const express = require('express')
const passport = require('passport')
const router = express.Router()
const mainController = require('../controllers/mainController.cjs')
const { formValidator } = require('../validators/formvalidator')


//google routes start 
router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );
  router.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    function (req, res) {
      console.log("google login succesful");
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

    //local auth starts 
   

    router.post('/login',
      passport.authenticate('local', { failureRedirect: false }), // Prevent automatic redirection on failure
      (req, res) => {
        return res.status(201).json({ message: 'Local login successful' });
      },
      (err, req, res, next) => {
        return res.status(401).json({ message: 'Login failed' });
      }
    )
    
    router.post('/signup',formValidator,mainController.signup)


module.exports = router 