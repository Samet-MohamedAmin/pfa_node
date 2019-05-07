'use strict'

const express = require('express')
const router = express.Router()
const adminCheck=require('../config/adminAuthMiddelware').checkAdminToken
const authCheck= require('../config/authMiddelware').checkToken
const courseController = require('../controllers/course')
const upload = require('../../index').upload

router
  .get('/course', courseController.getAll)
  .get('/course/:_id', courseController.getOne)
  .get('/course/recommendations/:userType/:userId',authCheck, courseController.getRecommendations)
  .get('/course/request/all',adminCheck, courseController.getAllUsersRequests)
  .get('/course/request/:userId',authCheck, courseController.getUserRequests)
  .post('/course',upload.single('courseImage'),courseController.addOne)
  .post('/course/rate', authCheck,courseController.rateCourse)
  .post('/course/registration/request',authCheck, courseController.userRegistrationRequest)
  .post('/course/registration/valid',adminCheck, courseController.userRegistrationValidation)
  .post('/course/registration/reject',adminCheck, courseController.userRegistrationReject)
  .put('/course/:_id',adminCheck, courseController.updateOne)
  .delete('/course/:_id',adminCheck, courseController.deleteOne)
// export router
module.exports = router
