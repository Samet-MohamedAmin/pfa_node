const mongoose = require('mongoose')
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('../config/secret');

mongoose.Promise=Promise
const Schema =mongoose.Schema

const PartnerSchema = Schema({
  firstName :{
    type:String,
    required :true
},
lastName :{
    type:String,
    required :true
},
email :{
    type:String,
    unique:true ,
    required :true
},
birthday: {
    type: String,
    required: true
},
cin :{
    type:Number,
    required :true
},

gender:{
    type:String,
    required:true
},

  company: {
    type: String, 
    required: true
},
speciality: {
    type: String,
     required: true
},
hash :String ,
salt : String 
  });

  PartnerSchema.methods.setPassword =(password) => {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  };
  PartnerSchema.methods.validPassword = (password) => {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
  };

  PartnerSchema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
  
    return jwt.sign({
      _id: this._id,
      user:this,
      role:'partner',
      exp: parseInt(expiry.getTime() / 1000),
    }, config.secret); 
  };

  const Partner = mongoose.model('Partner', PartnerSchema)

module.exports = Partner