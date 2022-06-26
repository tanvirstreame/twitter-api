export {};

const assert = require('assert');
let chai = require('chai');
const chaiHttp = require("chai-http");
import { faker } from '@faker-js/faker';


chai.use(chaiHttp);

const baseUrl = "http://127.0.0.1:8080"

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

	beforeEach(async () => {
		for (let user of users) {
			await userService.addUser(user);
		}
	})


	it('can be created correctly', async () => {

		let userList = await userService.getUsers();

		const data = await tweetService.addTweet({
			user: userList[0]?._id,
			post: posts[0]?.post
		});
		assert.equal(data.post, posts[0].post);
		assert(!data.isNew);
	});

	it('get tweets from followee', async () => {

		let userList = await userService.getUsers();

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

		assert.equal(tweetData?.data[0]?.fullName, userList[0]?.fullName);
		assert.equal(tweetData?.data[0]?.post, posts[0]?.post);

	});

	it("tweer single user api", async () => {
		require("../src/app");

		const userSignUpResponse = await chai
			.request(baseUrl)
			.post("/api/v1/users/signup")
			.send({
				fullName: faker.name.findName(),
				phone: faker.phone.number(),
				email: faker.internet.email(),
				age: 18,
				gender: "male",
				role: "public",
				status: "verified",
				avatar: "",
				password: "1234"
			});

		const res = await chai
			.request(baseUrl)
			.get("/api/v1/tweets")
			.set({ Authorization: userSignUpResponse.body.token });

		res.body.should.be.a('object');
		res.should.to.be.json;
		assert.strictEqual(res.status, 200, "http status should be 200");
	});

	it("tweer feed api", async () => {
		require("../src/app")

		const userSignUpResponse = await chai
			.request(baseUrl)
			.post("/api/v1/users/signup")
			.send({
				fullName: faker.name.findName(),
				phone: faker.phone.number(),
				email: faker.internet.email(),
				age: 18,
				gender: "male",
				role: "public",
				status: "verified",
				avatar: "",
				password: "1234"
			});

		const res = await chai
			.request(baseUrl)
			.get("/api/v1/tweets/feeds")
			.set({ Authorization: userSignUpResponse.body.token });

		res.body.should.be.a('object');
		res.should.to.be.json;
		assert.strictEqual(res.status, 200, "http status should be 200");
	});

});
