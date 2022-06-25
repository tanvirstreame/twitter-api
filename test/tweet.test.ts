import { response } from "express";

export { };
require("../src/bootstrap");
const assert = require('assert');
import { faker } from '@faker-js/faker';

const tweetService = require("../src/tweet/tweet.service");
const userService = require("../src/user/user.service");
const followService = require("../src/follow/follow.service");


/**
 * Create tweet
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
		age: 18,
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
		age: 18,
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
		age: 18,
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
		age: 18,
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
		age: 18,
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
		age: 18,
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
		age: 18,
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
		age: 18,
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
		age: 18,
		gender: "male",
		role: "public",
		status: "verified",
		avatar: "",
		password: "1234"
	}, {
		fullName: faker.name.findName(),
		phone: faker.phone.number(),
		email: faker.internet.email(),
		age: 18,
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
		age: 18,
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
		age: 18,
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
		age: 18,
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
		age: 18,
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
		age: 18,
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
	});

	it('get tweets from followee', async () => {

		const userList = await userService.addUser(users);

		await tweetService.addTweet({
			user: userList[0]?._id,
			post: posts[0]?.post
		});

		await tweetService.addTweet({
			user: userList[1]?._id,
			post: posts[0]?.post
		});

		await tweetService.addTweet({
			user: userList[2]?._id,
			post: posts[0]?.post
		});

		await tweetService.addTweet({
			user: userList[3]?._id,
			post: posts[0]?.post
		});

		await tweetService.addTweet({
			user: userList[4]?._id,
			post: posts[0]?.post
		});

		await followService.addFollow({
			followee: userList[0]?._id,
			follower: userList[1]?._id
		});

		await followService.addFollow({
			followee: userList[0]?._id,
			follower: userList[2]?._id
		});

		await followService.addFollow({
			followee: userList[0]?._id,
			follower: userList[3]?._id
		});

		await followService.addFollow({
			followee: userList[0]?._id,
			follower: userList[4]?._id
		});

		const tweetData = await tweetService.getTweets({
			user: userList[1]?._id,
		});


		assert.equal(tweetData[0].fullName, userList[0]?.fullName);
		assert.equal(tweetData[0].post, posts[0]?.post);

	});

});
