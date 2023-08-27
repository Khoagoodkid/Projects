const express = require('express')
const router = express.Router()
const AuthController = require('../controller/AuthController')

router.post('/', AuthController.signup )
router.get('/',AuthController.login)

module.exports = router
