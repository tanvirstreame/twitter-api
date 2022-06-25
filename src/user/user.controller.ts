export { };
import { Request, Response, NextFunction } from "express";
const userService = require("./user.service");

exports.signup = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = await userService.addUser(req.body);
		return res.status(201).json({
			token,
			message: "User registered succuesfully",
			succuss: true
		})
	}
	catch (error) {
		return next(error);
	}
}

exports.login = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = await userService.login(req.body);
		return res.status(201).json({
			token,
			message: "User registered succuesfully",
			succuss: true
		})
	}
	catch (error) {
		return next(error);
	}
}
