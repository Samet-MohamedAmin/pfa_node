
const Course = require('../models/course')
const Student = require('../models/student')
const Teacher = require('../models/teacher')
const indicatorService=require('../services/indicator')
const RegistrationRequest=require('../models/registrationRequest')
const mongodb = require("mongodb")

module.exports = {
  getAll () {
    console.log('course getAll')
    console.log(new Date())
    return Course
      .find()
  },
 
  getOne (_id) {
    console.log('course getOne')
    console.log(new Date())
    return Course.findById({_id: _id})
  },
  
  // this two methods concers courses registration requests
  getAllUsersRequests () {
    console.log('course requests getAll')
    console.log(new Date())
    return RegistrationRequest
      .find()
  },
  getUserRequests (userId) {
    console.log('user course requests getAll')
    console.log(new Date())
    return RegistrationRequest
      .find({userId:userId})
  },


  async getRecommendations(userType,userId) {
    console.log('course Recommendations')
    console.log(new Date())
    if(mongodb.ObjectID.isValid(userId)){
      if(userType=="student"){
        const student=await Student.findById(userId)
            if(student){
            let studentCoursesAttendedIds =student.coursesAttended.map(course=>course._id)
            return Course.find({
              concernedBranches:{ $elemMatch:{$regex : `.*${student.branch}.*`}},
              type:student.requestedPath,
              _id:{$nin:studentCoursesAttendedIds}
            })
            .sort({globalRating:-1})
            .limit(10)

              }else {
                let err={
                  success:false,
                  message:"User not found"
                }
                return err
              }
      
        }else if(userType=="teacher"){
  
        }else {
          let err={
            success:false,
            message:"Recommendations features are only avilable for students and teachers"
          }
          return err
        }
    }else {
      let err={
        success:false,
        message:"Invalid user Id "
      }
      return err

    }
      
    },
 async rateCourse(userType,userId,courseId,rating) {
    console.log('course rating')
    console.log(new Date())
    if(mongodb.ObjectID.isValid(userId) && mongodb.ObjectID.isValid(courseId)){
      
      const course= await Course.findById(courseId)   
    
      if(!course.doesUserRated(userId)){

        if(course){
          course.ratings.push({
            userId:userId,
            rating:rating
        })

        //updating the global rating of the course
        courseRatings=course.ratings.map(rate=>rate.rating)
        ratingSome=courseRatings.reduce((accumulator, currentValue) => accumulator + currentValue)
        course.globalRating=ratingSome/(courseRatings.length)
        course.save()
        //refreshing the rating info in the user document
        
        if(userType=="student"){
            var user=await Student.findById(userId)

        }else if(userType=="teacher"){
            var user=await Teacher.findById(userId)

        }
            if(user){
              let courseAttended=user.coursesAttended.find((courseAtt)=> courseAtt._id==course._id)
              courseAttended.rated=true
              courseAttended.rating=rating
              return user.save()
            }else{
              let error={
                success:false,
                message:"User not found "
              }
              return error
          }
            
            
        }else {
          let error={
            success:false,
            message:"Course not found "
          }
          return error
        }
      }else {
        return {
          success:false,
          message:"user already rated this course"
          }
      }    
      
    }else  {
      let err={
        success:false,
        message:"the user Id or the course Id is invalid "
      }
      return err
    }
  },
  async userRegistrationRequest(userType,userId,courseId) {
    console.log('user registration request')
    console.log(new Date())

    if(mongodb.ObjectID.isValid(userId) && mongodb.ObjectID.isValid(courseId)){
      const request = await RegistrationRequest.find({userId:userId,courseId:courseId})
      if(request.length == 0){
       let newRequest =new RegistrationRequest()
       if(userType=="student"){
        var user=await Student.findById(userId)

      }else if(userType=="teacher"){
        var user=await Teacher.findById(userId)

      } else if(userType !="student" && userType !="teacher" ) {
        return {
          success:false ,
          message:"User must be of type teacher or student "
        }
      } 
      const course =await Course.findById(courseId) 

      newRequest.userId=userId
      newRequest.courseId=courseId
      newRequest.course=course
      newRequest.user=user

       return newRequest.save()
      }else{
        return {
          success:false ,
          message:"this user have been already requested for this course "
        }
      }
     
    }else  {
      let error={
        success:false,
        message:"the user Id or the course Id is invalid "
      }
      return error

    }
   
  },
  async userRegistrationValidation(userType,userId,courseId) {
    console.log('user registration request validation by admin')
    console.log(new Date())
   let user =await(Course.register(userType,userId,courseId))
     if(user.success != false){
      RegistrationRequest.findOneAndUpdate( {userId:userId,courseId:courseId}, {$set:{state:"accepted"}}, {new: true}, (err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!");
        }
    });
     }
     return user
     
   },
  
   async userRegistrationReject(userId,courseId) {
    console.log('user registration request rejection by admin')
    console.log(new Date())
    const request = await RegistrationRequest.find({userId:userId,courseId:courseId})
    request[0].state="rejected"
    return request[0].save() 
     },

  async addOne (course,file) {
    console.log('course addOne')
    console.log(new Date())
    let _course = new Course(course)
    _course.availablePlaces=_course.totalPlaces
    _course.realized=false
    _course.courseImage=file.path
    //update number of cneter planified courses 
    await indicatorService.incrementCenterTrainingsNumber("planified")
    return _course.save()
  },
  async updateOne (_id, _course) {
    console.log('course updateOne')
    console.log(new Date())
    let beforeUpdate=await Course.findById(_id)
    let afterUpdate= await Course.findByIdAndUpdate(_id, _course,{new:true})
    if((beforeUpdate.realized!=afterUpdate.realized) &&(afterUpdate.realized=true) ) {
      await indicatorService.incrementCenterTrainingsNumber('realized')
    }
    return afterUpdate
  },
  deleteOne (_id) {
    console.log('course deleteOne')
    console.log(new Date())
    return Course
      .findByIdAndRemove({_id: _id})
      .exec(async(err, course) => {
        if (err) {
          console.error(err)
        } else {
          if (course.attendees.length >0){
          course.deleteAllRegistrations()
          await indicatorService.decrementCenterTrainingsNumber("both")
          }
          else{
          await indicatorService.decrementCenterTrainingsNumber("planified")
          }
        }
      })
  }
}