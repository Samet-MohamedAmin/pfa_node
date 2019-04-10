const express = require('express')
const bodyParser  = require ('body-parser')
const mongoose = require('mongoose')
const path = require('path')
const passport = require('passport');
var cors = require('cors')

const http = require('http')


const connexion = mongoose.connect('mongodb://localhost:27017/4c',function(err){
    if(err){
      console.log("Problem when connecting to the database")
    }})
const app = express()

app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
  res.header('Access-Control-Allow-Origin', req.headers.origin) // <-- you can change this with a specific url like http://localhost:4200
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,X-HTTP-Method-Override')
  next()
})

//passport
require('./server/config/passport');
app.use(passport.initialize());

//including the routes
app.use('/api', require('./server/routes/person'))
app.use('/api', require('./server/routes/course'))


const port = parseInt(process.env.PORT, 10) || 8000
app.set('port', port)
const server = http.createServer(app)
server.listen(port)