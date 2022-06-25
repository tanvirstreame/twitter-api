export {};
const userController = require("./user.controller");

const express = require('express')
const router = express.Router()

/**
 * User route are here
 */

router.post("/signup", userController.signup);
router.post("/login", userController.login)

module.exports = router;