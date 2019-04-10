'use strict'

const express = require('express')
const router = express.Router()
const adminCheck=require('../config/adminAuthMiddelware').checkAdminToken
const courseController = require('../controllers/course')

router
  .get('/course', courseController.getAll)
  .get('/course/:_id', courseController.getOne)
  .get('/course/recommendations/:userType/:userId', courseController.getRecommendations)
  .get('/course/branch/:branch', courseController.getByBranch)
  .post('/course',adminCheck ,courseController.addOne)
  .post('/course/rate', courseController.rateCourse)
  .post('/course/registration', courseController.userRegistration)
  .put('/course/:_id', courseController.updateOne)
  .delete('/course/:_id', courseController.deleteOne)
// export router
module.exports = router
