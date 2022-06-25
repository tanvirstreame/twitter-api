import { Types, Schema, model } from 'mongoose';

interface IFollow {
	followee: Types.ObjectId;
	follower: String;
}

const tweetSchema = new Schema<IFollow>(
	{
		followee: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true
		},
		follower: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true
		},
	},
	{
		timestamps: true,
	}
);

model('Follow', tweetSchema);
