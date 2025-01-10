const PORT = process.env.PORT || 3000;
const FRONTEND_ROUTE = "http://localhost:" + PORT

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    console.log('user not authenticated.redirected to login')
    return res.redirect(`${FRONTEND_ROUTE}/error`)
  }

module.exports = isAuthenticated


  