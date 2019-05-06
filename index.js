const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')
const passport = require('passport');
var cors = require('cors')
const Indicator=require('./server/models/indicator')

const http = require('http')

let mongo_url;
/* Setting up developement environment */
const NODE_ENV = process.env.NODE_ENV;
if (NODE_ENV == 'production') {
  const MONGO_USER = process.env.MONGO_USER;
  const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
  mongo_url = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@4c-vhflf.gcp.mongodb.net/test?retryWrites=true&&authSource=admin`;
}
else { mongo_url = 'mongodb://localhost:27017/4c' }

/* fix mongoose deprication warnings */
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const connexion = mongoose.connect(mongo_url, function (err) {
  if (err) {
    console.log("Problem when connecting to the database")
  }
  else {
    console.log('SUCCESSFULLY connected to mongo')
    Indicator.initilizeIndicatorsList()

  }
})
const app = express()
app.use('/uploads',express.static('uploads'))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({ "message": err.name + ": " + err.message });
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

//multer 
const multer =require('multer')
const storage =multer.diskStorage({
  destination:function(req,file,cb){
cb(null,'./uploads')
  },
  filename:function(req,file,cb){
  cb(null,new Date().toISOString().replace(/:/g, '-')+'_'+file.originalname)
  }
})
const upload =multer({storage:storage})

module.exports={
  upload
}

//including the routes
app.use('/api', require('./server/routes/person'))
app.use('/api', require('./server/routes/course'))
app.use('/api', require('./server/routes/indicator'))


const port = parseInt(process.env.PORT, 10) || 8000
app.set('port', port)
const server = http.createServer(app)
server.listen(port)

