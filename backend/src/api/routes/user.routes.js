const express = require('express');
const jwtCheck = require('../../middleware/validateToken.js');
const userController = require('../controllers/user.controller.js');

const router = express.Router()

// Use middleware to authorize request
router.use(jwtCheck)

router.get("/", userController.getUser)
router.delete("/", userController.deleteUser)

module.exports = router