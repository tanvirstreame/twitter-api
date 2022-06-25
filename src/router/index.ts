export {};
const express = require('express')
const router = express.Router()
const tweetRoute = require("../tweet/tweet.route");
const followRoute = require("../follow/follow.route");
const userRoute = require("../user/user.route")

/**
 * Module base routes are here
 */

router.use("/api/v1/tweets", tweetRoute);
router.use("/api/v1/follows", followRoute);
router.use("/api/v1/users", userRoute);


module.exports = router;