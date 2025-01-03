const mongoose = require('mongoose')

const mongooseConnect = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
    }catch{
        console.error(error)
        console.error('failed to connect to database')
    }
}

module.exports = mongooseConnect
