const mongoose = require('mongoose')
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('../config/secret');

mongoose.Promise=Promise
const Schema =mongoose.Schema

const StudentSchema = Schema({ 
    firstName :{
        type:String,
        required :true
    },
    lastName :{
        type:String,
        required :true
    },
    gender:{
        type:String,
        required:true
    },
    email :{
        type:String,
        unique:true ,
        required :true
    },
    birthday: {
        type: Date,
        required: true,
        default:new Date()

    },
    cin :{
        type:Number,
        required :true
    },

    numInscription: {
        type: Number, 
        required: true
    },
    yearOfStudy: {
        type: String, 
        required: true
    },
    branch: {
        type: String,
         required: true
    },
    requestedPath: {
        type: String,
        required: true
    },
    coursesAttended :{
        type:[
            {
                _id:String,
                rated :Boolean,
                rating:Number
            }
        ]
    },
    hash: {
        type: String,
        required: true,
        default:""
    },
    salt :{
        type: String,
        required:true,
        default:""
    }, 
  });

  StudentSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  };
  StudentSchema.methods.validPassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
  };

  StudentSchema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
  
    return jwt.sign({
      _id: this._id,
      user:this,
      role:'student',
      exp: parseInt(expiry.getTime() / 1000),
    }, config.secret); 
  };

  module.exports = mongoose.model('Student', StudentSchema)