export { };
import { Request, Response, NextFunction } from "express";
const tweetService = require("./tweet.service");

exports.addTweet = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await tweetService.addTweet({ post:req.body.post, user: req.user});
		return res.status(201).json({
			message: "Tweet saved succuesfully"
		})
	}
	catch (error) {
		return next(error);
	}
}

exports.getTweets = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const data = await tweetService.getTweets(req.query);
		return res.status(200).json({
			data
		})
	}
	catch (error) {
		return next(error);
	}
}
