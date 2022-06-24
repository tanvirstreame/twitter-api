export { };
const { model } = require("mongoose");
const Tweet = model("Tweet");

exports.addTweet = async (data: any) => {
	return await Tweet.create(data);
}

exports.getTweets = async (filter: any) => {
	return await Tweet.find(filter, ["user", "post"]).populate("user", "fullName").lean();
}
