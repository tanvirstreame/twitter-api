import { response } from "express";

export { };
require("../src/bootstrap");
const assert = require('assert');

const tweetService = require("../src/tweet/tweet.service");
const userService = require("../src/user/user.service");


/**
 * Create tweet
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
];

const posts = [
	{
		post: "Awesome world"
	}
];

/**
 * Tweet test suite.
 */
describe('tweet ', () => {

	/**
	 * Tests that a valid tweet can be created without throwing any errors.
	 */

	it('can be created correctly', async () => {

		const userData = await userService.addUser(users[0]);
		const data = await tweetService.addTweet({
			user: userData?._id,
			post: posts[0]?.post
		});
		console.log('data', data)
		assert.equal(data.post, posts[0].post);
		assert(!data.isNew);
	})
});
