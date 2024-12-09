function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    console.log('user not authenticated.redirected to login')
    return res.status(401).json({message : "User not authenticated"})
  }

module.exports = isAuthenticated


  