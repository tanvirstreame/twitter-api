export { };
const passport = require("passport");
const followController = require("./follow.controller");

const express = require('express')
const router = express.Router()

router.post(
	"/:userId",
	passport.authenticate("jwt", { session: false }),
	followController.addFollow
)

module.exports = router;