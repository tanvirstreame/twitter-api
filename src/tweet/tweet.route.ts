const tweeterController = require("./tweet.controller");

const express = require('express')
const router = express.Router()

router.post("/", tweeterController.addTweet)

router.get("/", tweeterController.getTweets)

module.exports = router;