import { Schema, model } from 'mongoose';

interface IUser {
	fullName: string;
	phone: String;
	email: String;
	age: number;
	gender: String;
	role: String;
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
	avatar: String,
	hash: String,
	salt: String,
});

model('User', userSchema);
