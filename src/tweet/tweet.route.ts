const tweeterController = require("./tweet.controller");
const passport = require("passport");
const express = require('express')
const router = express.Router()

router.post(
	"/",
	passport.authenticate("jwt", { session: false }),
	tweeterController.addTweet
);

router.get(
	"/feed",
	passport.authenticate("jwt", { session: false }),
	tweeterController.getTweets
);

router.get(
	"/",
	passport.authenticate("jwt", { session: false }),
	tweeterController.getSingleTweets
);

module.exports = router;