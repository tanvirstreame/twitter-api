const tweeterController = require("./tweet.controller");

const express = require('express')
const router = express.Router()

router.post("/v1/tweets", tweeterController.addTweet)

router.get("/v1/tweets", tweeterController.getTweets)

module.exports = router;