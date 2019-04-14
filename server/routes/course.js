'use strict'

const express = require('express')
const router = express.Router()
const adminCheck=require('../config/adminAuthMiddelware').checkAdminToken
const authCheck= require('../config/authMiddelware').checkToken
const courseController = require('../controllers/course')

router
  .get('/course', courseController.getAll)
  .get('/course/:_id', courseController.getOne)
  .get('/course/recommendations/:userType/:userId', courseController.getRecommendations)
  .get('/course/branch/:branch', courseController.getByBranch)
  .get('/course/request/all',adminCheck, courseController.getAllUsersRequests)
  .get('/course/request/:userId',authCheck, courseController.getUserRequests)
  .post('/course',adminCheck ,courseController.addOne)
  .post('/course/rate', courseController.rateCourse)
  .post('/course/registration/request', courseController.userRegistrationRequest)
  .post('/course/registration/valid',adminCheck, courseController.userRegistrationValidation)
  .post('/course/registration/reject',adminCheck, courseController.userRegistrationReject)
  .put('/course/:_id', courseController.updateOne)
  .delete('/course/:_id', courseController.deleteOne)
// export router
module.exports = router
