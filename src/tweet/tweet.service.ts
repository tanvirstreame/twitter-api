export { };
const { model } = require("mongoose");
const ObjectId = require('mongodb').ObjectID;
const Tweet = model("Tweet");
const Follow = model("Follow");


exports.addTweet = async (data: any) => {
	return await Tweet.create(data);
}

exports.getTweets = async (filter: any) => {

	const data = await Follow.aggregate(
		[
			{
				$match: {
					follower: ObjectId(filter?.user)
				}
			},
			{
				$lookup: {
					from: 'tweets',
					let: { followee: "$followee" },
					pipeline: [
						{ $match: { $expr: { $eq: ["$user", "$$followee"] } } },
						{ $project: { _id: 0, user: 1, post: 1, createdAt: 1 } },
						{ $sort: { createdAt: -1 } },
						{ $limit: 5 }
					],
					as: 'tweetFeed'
				}
			},
			{ $unwind: "$tweetFeed" },
			{ $sort: { "tweetFeed.createdAt": -1 } },
			{ $limit: 15 },
			{
				$project: {
					tweetFeed: 1
				}
			},
			{
				$lookup: {
					from: 'users',
					let: { user: "$tweetFeed.user" },
					pipeline: [
						{ $match: { $expr: { $eq: ["$_id", "$$user"] } } },
						{ $project: { _id: 0, fullName: 1 } }
					],
					as: 'userInfo'
				}
			},
			{
				$project: {
					fullName: { $arrayElemAt: ["$userInfo.fullName", 0] },
					post: "$tweetFeed.post",
					createdAt: "$tweetFeed.createdAt"
				}
			},
		]
	)
	return data;

}
