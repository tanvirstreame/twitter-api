export { };
const { model } = require("mongoose");
const Follow = model("Follow");

exports.addFollow = async (data: any) => {
	return await Follow.create(data);
}
