export { };
const { model } = require("mongoose");
const Follow = model("Follow");
const User = model("User");

exports.addFollow = async (data: any) => {

	/**
	 * Add follow here
	 */

	const followInfo = await Follow.findOne(data, ["_id"]).lean();
	if (followInfo?._id) {

		/**
		 * Alraedy following the followee
		 */

		let error: any = new Error("You are already following this person");
		error.status = 400;
		throw error;
	}
	else {
		const followInfo = await User.findOne({ _id: data?.followee }, ["_id"]).lean();
		if (followInfo?._id) {

			/**
			 * Validating if the id really exists
			 */

			return await Follow.create(data);
		}
		else {
			let error: any = new Error("No such followee with that id");
			error.status = 404;
			throw error;
		}
	}
}
