export {};
const followController = require("./follow.controller");

const express = require('express')
const router = express.Router()

router.post("/", followController.addFollow)

module.exports = router;