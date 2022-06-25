export { };
import { Request, Response, NextFunction } from "express";
const followService = require("./follow.service");

exports.addFollow = async (req: Request, res: Response, next: NextFunction) => {

	/**
	 * Add follow here
	 */
	
	try {
		await followService.addFollow({followee: req.params.userId, follower: req.user});
		return res.status(201).json({
			message: "Followed succuesfully"
		})
	}
	catch (error) {
		return next(error);
	}
}

