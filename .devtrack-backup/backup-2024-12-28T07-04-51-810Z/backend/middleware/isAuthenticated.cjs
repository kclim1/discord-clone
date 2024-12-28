function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    console.log('user not authenticated.redirected to login')
    return res.redirect('http://localhost:5173/error')
  }

module.exports = isAuthenticated


  