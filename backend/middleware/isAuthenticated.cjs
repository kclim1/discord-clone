function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    console.log('user not authenticated.redirected to login')
    return res.redirect(`${process.env.FRONTEND_ROUTE}/error`)
  }

module.exports = isAuthenticated


  