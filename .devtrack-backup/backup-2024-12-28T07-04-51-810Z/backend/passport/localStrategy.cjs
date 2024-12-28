const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('../models/userSchema.cjs')
const bcryptjs = require('bcryptjs')

  
 const localStrategy = ()=>{
    passport.use(new LocalStrategy(
        async function(username,password,done){
            try{
                const localUser = await User.findOne({username : username })
                
                if(!localUser){
                    console.log('please login again')
                    return done(null,false)
                }
                let isMatch = await bcryptjs.compare(password , localUser.password)
                if(!isMatch){
                    console.log('please login again')
                    return done(null,false)
                }
                return done(null,localUser)
            }catch(error){
                console.error(error)
                console.log('local strategy failure')
                return done(error)
            }
        }
      ))
 }

module.exports = localStrategy