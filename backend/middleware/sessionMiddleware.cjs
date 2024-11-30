const session = require('express-session')
const MongoStore = require('connect-mongo')

const sessionMiddleware = session({
  secret: 'process.env.SESSION_SECRET', 
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI, // MongoDB URI from environment variables
    ttl: 14 * 24 * 60 * 60, // 14 days
  }),
});

module.exports = sessionMiddleware