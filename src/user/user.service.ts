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
	else return;
}

exports.login = async (data: any) => {

	/**
	 * Login here
	 */

	const user = await User.findOne({ email: data.email });
	if (!user) {
		throw new Error("Could not find user");

	} else if (user.status === "block") {
		throw new Error("This user has been blocked");
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
		throw new Error("Wrong credintial!");
	}
}

exports.getUsers = async (filter: any) => {
	
	/**
	 * Get all users here
	 */

	return await User.find(filter, ["fullName", "email", "age"]).lean();
}
