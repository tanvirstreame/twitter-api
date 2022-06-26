const tweeterController = require("./tweet.controller");
const passport = require("passport");
const express = require('express')
const router = express.Router()

/**
 * Tweet route are here
 */

router.post(
	"/",
	passport.authenticate("jwt", { session: false }),
	tweeterController.addTweet
);

router.get(
	"/feeds",
	passport.authenticate("jwt", { session: false }),
	tweeterController.getTweets
);

router.get(
	"/",
	passport.authenticate("jwt", { session: false }),
	tweeterController.getSingleTweets
);

module.exports = router;