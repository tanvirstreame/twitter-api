import { Schema, model } from 'mongoose';

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

const userSchema = new Schema<IUser>({
	fullName: {
		type: String,
		trim: true,
		required: true
	},
	phone: {
		type: String,
		unique: true,
		index: true
	},
	email: {
		type: String,
		unique: true,
		trim: true,
		lowercase: true,
		index: true
	},
	age: { 
		type: Number, 
		required: true 
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
		default: "pending",
		enum: ["pending", "verified", "block"],
	},
	avatar: String,
	hash: {
		type: String,
		required: true
	},
	salt:  {
		type: String,
		required: true
	},
});

declare global {
	namespace Express {
	  interface Request {
		user: IUser //or other type you would like to use
	  }
	}
  }

model('User', userSchema);
