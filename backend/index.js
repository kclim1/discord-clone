const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const http = require('http')
const socketIo = require('socket.io')
const server = http.createServer(app)
const io = socketIo(server)
const mongoose = require('mongoose')
const mongooseConnect = require('./models/mongooseConnect')
const User = require('./models/userSchema')

//function can be found in mongooseConnect.js
mongooseConnect()

server.listen(port,()=>{
    console.log('server running on port 3000')
})




const addUser = async ()=>{
    try{
        await new User({
            username : "my first user"
        })
        console.log('success')
    }catch{
        console.log("failed to enter")
    }
}
addUser()


