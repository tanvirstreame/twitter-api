import { response } from "express";

export { };
require("../src/bootstrap");
const assert = require('assert');

const followService = require("../src/follow/follow.service");
const userService = require("../src/user/user.service");


/**
 * Create follow
 */

const users = [
	{
		fullName: "Jhon  ",
		phone: "0171212113",
		email: "jhonedoe@gmail.com",
		age: 28,
		gender: "male",
		role: "public",
		status: "verified",
		avatar: "",
		password: "1234"
	},
	{
		fullName: "Labib",
		phone: "0175515115",
		email: "Labib@gmail.com",
		age: 20,
		gender: "male",
		role: "public",
		status: "verified",
		avatar: "",
		password: "1234"
	}
];


/**
 * Follow test suite.
 */
describe('follow ', () => {

	/**
	 * Tests that a valid follow can be created without throwing any errors.
	 */

	it('can be created correctly', async () => {

		const userList = await userService.addUser(users);
		const data = await followService.addFollow({
			followee: userList?.[0]?._id,
			follower: userList?.[1]?._id
		})
		assert(!data.isNew);
	})
});
