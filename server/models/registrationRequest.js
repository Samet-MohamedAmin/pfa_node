const mongoose = require('mongoose')

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
state:{
    type:String,
    required :true,
    default:'pending'
}


});

const RegistrationRequest = mongoose.model('RegistrationRequest', RegistrationRequestSchema)

module.exports = RegistrationRequest