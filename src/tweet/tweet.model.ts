import { Types, Schema, model } from 'mongoose';

interface ITweet {
	user: Types.ObjectId;
	post: String;
}

const tweetSchema = new Schema<ITweet>(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true
		},
		post: {
			type: String,
			required: true
		},
	},
	{
		timestamps: true,
	}
);

model('Tweet', tweetSchema);
