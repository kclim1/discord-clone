function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    console.log('user not authenticated.redirected to login')
    return res.redirect(`${process.env.BASE_URL}/error`)
  }

module.exports = isAuthenticated


  