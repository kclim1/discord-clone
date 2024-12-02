const passport = require('passport')

 const deserializeUser = ()=>{
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      console.log('user deserialized')
      done(null, user);
    } catch (error) {
      console.error(error);
      done(error);
    }
  });
 }

  module.exports= deserializeUser