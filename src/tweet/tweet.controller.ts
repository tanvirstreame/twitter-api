export { };
import { Request, Response, NextFunction } from "express";
const tweetService = require("./tweet.service");

exports.addTweet = async (req: Request, res: Response, next: NextFunction) => {

	/**
	 *  Create tweet controller
	 */

	try {
		await tweetService.addTweet({ post: req.body.post, user: req.user });
		return res.status(201).json({
			message: "Tweet saved successfully",
			success: true
		})
	}
	catch (error) {
		return next(error);
	}
}


exports.getTweets = async (req: Request, res: Response, next: NextFunction) => {

	/**
	 *  Get tweets from the followee users
	 */

	try {
		const data = await tweetService.getTweets({ ...req.query, user: req.user });
		return res.status(200).json({
			data: data?.data,
			totalCount: data?.totalCount,
			itemPerPage: data?.itemPerPage,
			totalPage: Math.ceil(data?.totalCount / data?.itemPerPage),
			success: true
		})
	}
	catch (error) {
		return next(error);
	}
}

exports.getSingleTweets = async (req: Request, res: Response, next: NextFunction) => {

	/**
	 *  Get single user tweets
	 */

	try {
		const data = await tweetService.getSingleTweets({ ...req.query, user: req.user });
		return res.status(200).json({
			data: data?.data,
			totalCount: data?.totalCount,
			itemPerPage: data?.itemPerPage,
			totalPage: Math.ceil(data?.totalCount / data?.itemPerPage),
			success: true
		})
	}
	catch (error) {
		return next(error);
	}
}
