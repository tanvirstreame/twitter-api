export { };
const { model } = require("mongoose");
const Follow = model("Follow");
const User = model("User");
const ObjectId = require('mongodb').ObjectID;

exports.addFollow = async (data: any) => {

	/**
	 * Add follow here
	 */

	if(ObjectId(data?.follower).valueOf() === String(data?.followee)) {

		/**
		 * If any user try to follow himself
		 */

		let error: any = new Error("You can't follow yourself, try another followee");
		error.status = 400;
		throw error;

	}

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
