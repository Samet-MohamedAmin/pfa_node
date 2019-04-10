
const express = require('express')
const router = express.Router()


const authenticationController = require('../controllers/authentication')

router.post('/register', authenticationController.register);
router.post('/login', authenticationController.login);

// export router
module.exports = router