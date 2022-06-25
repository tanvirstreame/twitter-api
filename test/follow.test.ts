import { response } from "express";

export { };
require("../src/bootstrap");
const assert = require('assert');
import { faker } from '@faker-js/faker';

const followService = require("../src/follow/follow.service");
const userService = require("../src/user/user.service");


/**
 * Create follow
 */

const users = [
	{
		fullName: faker.name.findName(),
		phone: faker.phone.number(),
		email: faker.internet.email(),
		age: 28,
		gender: "male",
		role: "public",
		status: "verified",
		avatar: "",
		password: "1234"
	},
	{
		fullName: faker.name.findName(),
		phone: faker.phone.number(),
		email: faker.internet.email(),
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

		let userList = [];
		for(let user of users) {
			const { userData } = await userService.addUser(user)
			userList.push(userData);
		}
		
		const data = await followService.addFollow({
			followee: userList?.[0]?._id,
			follower: userList?.[1]?._id
		})
		assert(!data.isNew);
	})
});
