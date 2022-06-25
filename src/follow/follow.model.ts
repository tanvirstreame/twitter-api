import { Types, Schema, model } from 'mongoose';

/**
 * Follow schema is here
 */

interface IFollow {
	followee: Types.ObjectId;
	follower: String;
}

const followSchema = new Schema<IFollow>(
	{
		followee: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
			index: true
		},
		follower: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
			index: true
		},
	},
	{
		timestamps: true,
	}
);

model('Follow', followSchema);
