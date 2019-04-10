
const courseService = require('../services/course')
module.exports = {
  async getAll (req, res) {
    const courses = await courseService.getAll()
    res.json(courses)
  },
  async getByBranch (req, res) {
    const courses = await courseService.getByBranch(req.params.branch)
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
   async userRegistration (req, res) {
    const registeredUser = await courseService.userRegistration(req.body.userType,req.body.userId,req.body.courseId)
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
