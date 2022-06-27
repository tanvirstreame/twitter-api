import { Types, Schema, model } from 'mongoose';

/**
 * Tweet schema is here
 */
interface ITweet {
	user: Types.ObjectId;
	post: String;
}

const tweetSchema = new Schema<ITweet>(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
			index: true
		},
		post: {
			type: String,
			required: true,
			minLength: 10,
			maxLength: 280
		},
	},
	{
		timestamps: true,
	}
);

tweetSchema.index({createdAt : -1});

model('Tweet', tweetSchema);
