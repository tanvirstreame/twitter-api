import { Schema, model } from 'mongoose';

/**
 * User schema is here
 */

interface IUser {
	fullName: string;
	phone: String;
	email: String;
	age: number;
	gender: String;
	role: String;
	status: String;
	avatar?: string;
	hash: String;
	salt: String;
}

const userSchema = new Schema<IUser>(
	{
		fullName: {
			type: String,
			trim: true,
			required: true,
			minlength: 4
		},
		phone: {
			type: String,
			unique: true,
			index: true,
			minlength: 4
		},
		email: {
			type: String,
			unique: true,
			trim: true,
			lowercase: true,
			index: true,
			minlength: 4,
			validate: {
				validator: function (v) {
					return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
				},
				message: "Please enter a valid email"
			},
		},
		age: {
			type: Number,
			required: true,
			max: 90,
			min: [18, 'Your age is not eligle']
		},
		gender: {
			type: String,
			enum: ["male", "female"],
			required: true
		},
		role: {
			type: String,
			default: "public",
			enum: ["public", "admin", "tester",],
		},
		status: {
			type: String,
			default: "verified",
			enum: ["pending", "verified", "block"],
		},
		avatar: String,
		hash: {
			type: String,
			required: true
		},
		salt: {
			type: String,
			required: true
		},
	},
	{
		timestamps: true,
	}
);

declare global {
	namespace Express {
		interface Request {
			user: IUser 
		}
	}
}

model('User', userSchema);
