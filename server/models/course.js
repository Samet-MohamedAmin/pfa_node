const mongoose = require('mongoose')
const Student =require('./student')
const Teacher =require('./teacher')
const indicatorService = require('../services/indicator')

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
    type:Date,
    required :true,
    default:new Date()
},
endDate :{
    type:Date,
    required :true,
    default:new Date()
},
totalHours:{
    type:Number
},
level:{
    type:String,
}
,
briefDescription:{
    type:String,
},
detailedDescription:{
    type:String,
},
totalPlaces :{
    type:Number,
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
realized:{
    type:Boolean,
    default:false
},
courseImage:{
type:String,
required:true
},
concernedBranches :{
    type:[String]
},
requirements:{
    type:[String],
} ,
goals :{
    type:[String],
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

CourseSchema.methods.deleteAllRegistrations = function()  {
    this.attendees.forEach(function(userId){
    Student.findById(userId).exec((err,student)=>{
        if(err) {
            console.log(err)
            return;
        }
        if(!student){
        Teacher.findById(userId,(err,teacher)=>{
            if(err) {
                console.log(err)
                return;
            }
           let coursesAttendedIds=teacher.coursesAttended.map(course=>course._id)
           let index= coursesAttendedIds.indexOf(this._id)
           teacher.coursesAttended.splice(index,1)
           teacher.save()
        })
        }else if(student){
            let coursesAttendedIds=student.coursesAttended.map(course=>course._id)
            let index= coursesAttendedIds.indexOf(this._id)
            student.coursesAttended.splice(index,1)
            student.save()
        }
    })
    })
   };

CourseSchema.statics.register = async function(userType,userId,courseId)  {
        const course = await Course.findById(courseId)
       if (course){
        if(!course.isUserRegistered(userId)){
          course.attendees.push(userId)
          course.availablePlaces--
          course.save()
          //refreshing the rating info in the user document
          
          if(userType=="student"){
              var user=await Student.findById(userId)

          }else if(userType=="teacher"){
              var user=await Teacher.findById(userId)

          }else{
            return {
              success:false,
              message:"Only teachers and students can register to courses  "
              }
          }
          if(user){
            user.coursesAttended.push({
              _id:courseId,
              rated :false,
              rating:undefined
            })

            //update number of formed members in the indicators
            indicatorService.incrementFormedMembersNumber(userType,user.gender=="female")

            return user.save()
          }else {
            return {
              success:false,
              message:"User not found "
              }
          }
        }else {
          return {
            success:false,
            message:"user is already registered in this course"
            }
        }
                  
            }else{
              console.log('!course')
             return {
              success:false,
              message:"Course not found "
              }
            }          
};

const Course = mongoose.model('Course', CourseSchema)

module.exports = Course