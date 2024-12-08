const isAuthenticated = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next()
    }return res.status(401).json({message : "User not authenticated"})
}

module.exports = isAuthenticated