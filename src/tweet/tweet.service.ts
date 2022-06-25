export { };
const { model } = require("mongoose");
const ObjectId = require('mongodb').ObjectID;
const Tweet = model("Tweet");
const Follow = model("Follow");


exports.addTweet = async (data: any) => {
	return await Tweet.create(data);
}

exports.getSingleTweets = async (filter: any) => {

	const page: number = filter?.page || 1;
	const PAGE_SIZE = 10;
	const skip: number = (page - 1) * PAGE_SIZE;

	delete filter.page;
	const data = await Tweet.aggregate([
		{
			$match: {
				user: ObjectId(filter?.user)
			}
		},
		{ $sort: { createdAt: -1 } },
		{
			$lookup: {
				from: 'users',
				let: { user: "$user" },
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
				post: "$post",
				createdAt: "$createdAt"
			}
		},
		{
			$facet: {
				data: [
					{ $skip: skip },
					{ $limit: PAGE_SIZE }
				],
				total: [
					{ "$count": "count" }
				]
			}
		}
	]);

	return {data: data?.[0]?.data, total: data?.[0]?.total?.[0]?.count };
}


exports.getTweets = async (filter: any) => {

	const page: number = filter?.page || 1;
	const PAGE_SIZE = 10;
	const skip: number = (page - 1) * PAGE_SIZE;

	delete filter.page;

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
			{
        $facet: {
          data: [
            { $skip: skip },
            { $limit: PAGE_SIZE }
          ],
          total: [
            { "$count": "count" }
          ]
        }
      }
		]
	)
	return {data: data?.[0]?.data, total: data?.[0]?.total?.[0]?.count };

}
