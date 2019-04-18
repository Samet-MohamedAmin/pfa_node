const mongoose = require('mongoose')
const Course =require('./course').schema
const Student=require('./student').schema
const Teacher=require('./teacher').schema

mongoose.Promise=Promise

const Schema =mongoose.Schema

const RegistrationRequestSchema =Schema({
userId:{
    type:String,
    required:true
},
courseId:{
    type:String,
    required:true
},
course:Course,
user:Student|Teacher,
state:{
    type:String,
    required :true,
    default:'pending'
}

});

const RegistrationRequest = mongoose.model('RegistrationRequest', RegistrationRequestSchema)

module.exports = RegistrationRequest