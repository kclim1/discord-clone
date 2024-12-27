const passport = require('passport')

const serializeUser = ()=>{
  passport.serializeUser((user, done) => {
    try {
      // console.log('serialize:', user);
      done(null, user.id);
    } catch (error) {
      console.error(error);
      done(error);
    }
  });
}

  module.exports = serializeUser