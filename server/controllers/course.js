
const courseService = require('../services/course')
module.exports = {
  async getAll (req, res) {
    const courses = await courseService.getAll()
    res.json(courses)
  },
  async getAllUsersRequests (req, res) {
    const courses = await courseService.getAllUsersRequests()
    res.json(courses)
  },
  async getUserRequests (req, res) {
    const courses = await courseService.getUserRequests(req.params.userId)
    res.json(courses)
  },
  async getRecommendations (req, res) {
    const courses = await courseService.getRecommendations(req.params.userType,req.params.userId)
    res.json(courses)
  },
  async addOne (req, res) {
    const course = await courseService.addOne(req.body)
    res.json(course)
  },
  async getOne (req, res) {
    const course = await courseService.getOne(req.params._id)
    res.json(course)
  },
   async rateCourse (req, res) {
   const ratingUser= await courseService.rateCourse(req.body.userType,req.body.userId,req.body.courseId,req.body.rating)
   res.json(ratingUser)
  },
   async userRegistrationRequest (req, res) {
    const registeredUser = await courseService.userRegistrationRequest(req.body.userType,req.body.userId,req.body.courseId)
    res.json(registeredUser)
  },
  async userRegistrationValidation (req, res) {
    const registeredUser = await courseService.userRegistrationValidation(req.body.userType,req.body.userId,req.body.courseId)
    res.json(registeredUser)
  },
  async userRegistrationReject (req, res) {
    const registeredUser = await courseService.userRegistrationReject(req.body.userId,req.body.courseId)
    res.json(registeredUser)
  },

  async updateOne (req, res) {
    const course = await courseService.updateOne(req.params._id, req.body)
    res.json(course)
  },
  async deleteOne (req, res) {
    const course = await courseService.deleteOne(req.params._id)
    res.json(course)
  }
}
