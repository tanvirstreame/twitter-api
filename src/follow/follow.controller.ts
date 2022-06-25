export { };
import { Request, Response, NextFunction } from "express";
const followService = require("./follow.service");

exports.addFollow = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await followService.addFollow(req.body);
		return res.status(201).json({
			message: "Followed succuesfully"
		})
	}
	catch (error) {
		return next(error);
	}
}

