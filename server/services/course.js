
const Course = require('../models/course')
const Student = require('../models/student')
const Teacher = require('../models/teacher')
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
  getByBranch (branch) {
    console.log('branch courses')
    console.log(new Date())
    return Course.find({concernedBranches:branch})
  },
  async getRecommendations(userType,userId) {
    console.log('course Recommendations')
    console.log(new Date())
    if(mongodb.ObjectID.isValid(userId)){
      if(userType=="student"){
        const student=await Student.findById(userId)
            if(student){
            let studentCoursesAttendedIds =student.coursesAttended.map((course)=>course._id)
            return Course.find({
              concernedBranches:student.branch,
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
  async userRegistration(userType,userId,courseId) {
    console.log('user registration')
    console.log(new Date())

    if(mongodb.ObjectID.isValid(userId) && mongodb.ObjectID.isValid(courseId)){

       const course = await Course.findById(courseId)
       if (course){
        if(!course.isUserRegistered(userId)){
          course.attendees.push(userId)
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
       
    }else  {
      let error={
        success:false,
        message:"the user Id or the course Id is invalid "
      }
      return error

    }
   
  },
  addOne (course) {
    console.log('course addOne')
    console.log(new Date())
    let _course = new Course(course)
    _course.availablePlaces=_course.totalPlaces
    return _course.save()
  },
  updateOne (_id, _course) {
    console.log('client updateOne')
    console.log(new Date())
    _course.updatedAt = new Date()
    return Course.findByIdAndUpdate({_id: _id}, _course)
  },
  deleteOne (_id) {
    console.log('client deleteOne')
    console.log(new Date())
    return Course
      .findByIdAndRemove({_id: _id})
      .exec((err, data) => {
        if (err) {
          console.error(err)
        } else {
          console.log(data)
        }
      })
  }
}