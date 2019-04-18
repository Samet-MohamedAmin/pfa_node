
const express = require('express')
const router = express.Router()
const indicatorController =require('../controllers/indicator')
const adminCheck=require('../config/adminAuthMiddelware').checkAdminToken
router.get('/indicator', indicatorController.getAll);
router.put('/indicator/:_id',adminCheck,indicatorController.updateOne)

// export router
module.exports = router