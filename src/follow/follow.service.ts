export { };
const { model } = require("mongoose");
const Follow = model("Follow");

exports.addFollow = async (data: any) => {
	const followInfo =  await Follow.findOne(data, ["_id"]).lean();
	if(followInfo?._id) {
		throw new Error("You are already following this person");
	}
	else {
		return await Follow.create(data);
	}
	
}
