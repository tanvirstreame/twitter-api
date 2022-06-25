import { NextFunction, Request, Response } from "express"

const express = require('express')
const router = express.Router()
const tweetRoute = require("../tweet/tweet.route")

router.use("/api", tweetRoute);

module.exports = router;