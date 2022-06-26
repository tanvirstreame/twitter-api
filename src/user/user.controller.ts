export { };
import { Request, Response, NextFunction } from "express";
const userService = require("./user.service");


exports.signup = async (req: Request, res: Response, next: NextFunction) => {

	/**
	 *  User signup are here
	 */

	try {
		const { token } = await userService.addUser(req.body);
		if (token) {
			return res.status(201).json({
				token,
				message: "User registered succuesfully",
				success: true
			})
		}
	}
	catch (error) {
		return next(error);
	}
}

exports.login = async (req: Request, res: Response, next: NextFunction) => {

	/**
	 *  User login are here
	 */

	try {
		const token = await userService.login(req.body);
		if (token) {
			return res.status(200).json({
				token,
				message: "User logined succuesfully",
				success: true
			})
		}
	}
	catch (error) {
		return next(error);
	}
}
