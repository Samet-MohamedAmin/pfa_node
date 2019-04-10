const mongoose = require('mongoose')

mongoose.Promise=Promise

const Schema =mongoose.Schema

const CourseSchema =Schema({
title: {
type:String,
required:true
} ,  
instructor :{
    type:String,
    required :true
},
startDate :{
    type:String,
    required :true
},
endDate :{
    type:String,
    required :true
},
totalHours:{
    type:Number,
    required :true
},
level:{
    type:String,
    required:'true'
}
,
requirements:{
type:[String],
required:true
} ,
goals :{
type:[String],
required:true
},
briefDescription:{
type:String,
required:true
},
detailedDescription:{
type:String,
required:true
},
totalPlaces :{
    type:Number,
    required :true
},
availablePlaces :{
    type:Number
},
globalRating: {
    type :Number,
    default:0
},
type :{
    type :String
},
concernedBranches :{
    type:[String]
},
ratings:{
    type:[{
        userId:String,
        rating:Number
    }]
},
attendees:{
    type:[String]
}

});

CourseSchema.methods.isUserRegistered = function(userId)  {
   return this.attendees.includes(userId)
  };

  CourseSchema.methods.doesUserRated = function(userId)  {
      usersAlreadyRated=this.ratings.map(rating=>rating.userId)
      return usersAlreadyRated.includes(userId)
   };


const Course = mongoose.model('Course', CourseSchema)

module.exports = Course