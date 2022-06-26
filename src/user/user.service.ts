export { };
const { model } = require("mongoose");
const User = model("User");
const { issueJWT, genPassword, validPassword } = require("../utils/jwt")

exports.addUser = async (data: any) => {

	/**
	 * Add user here
	 */

	const userData = await User.create({ ...data, ...genPassword(data?.password) });
	const _id = userData?._id;
	if (_id) {
		const { token } = issueJWT(_id);
		return { userData, token }
	}
	else {
		throw new Error("Registration failed");
	};
}

exports.login = async (data: any) => {

	/**
	 * Login here
	 */

	const user = await User.findOne({ email: data.email });
	if (!user) {
		let error: any = new Error("User not found")
		error.status = 404;
		throw error;

	} else if (user.status === "block") {
		let error: any = new Error("This user has been blocked")
		error.status = 403;
		throw error;
	}
	const isValid = validPassword(
		data.password,
		user.hash,
		user.salt
	);
	if (isValid) {
		const { token } = issueJWT(user);
		return token;
	}
	else {
		let error: any = new Error("Invalid credintial")
		error.status = 404;
		throw error;
	}
}

exports.getUsers = async (filter: any) => {

	/**
	 * Get all users here
	 */

	return await User.find(filter, ["fullName", "email", "age"]).lean();
}
