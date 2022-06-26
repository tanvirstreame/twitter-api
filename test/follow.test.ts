import { response } from "express";

export { };
require("../src/bootstrap");
const assert = require('assert');
let chai = require('chai');
const chaiHttp = require("chai-http");
import { faker } from '@faker-js/faker';

const followService = require("../src/follow/follow.service");
const userService = require("../src/user/user.service");
const User = require("mongoose").model("User");

chai.use(chaiHttp);

const baseUrl = "http://127.0.0.1:8080"


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

beforeEach(async () => {
	for (let user of users) {
		await userService.addUser(user);
	}
})


/**
 * Follow test suite.
 */
describe('follow ', () => {

	/**
	 * Tests that a valid follow can be created without throwing any errors.
	 */

	it('can be created correctly', async () => {

		let userList = await userService.getUsers();

		const data = await followService.addFollow({
			followee: userList?.[0]?._id,
			follower: userList?.[1]?._id
		})
		assert(!data.isNew);
	})

	it("Follow a followee successfully", async () => {
		require("../src/app")

		await chai
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

		const secondUser = await chai
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

		const userInfo = await User.findOne({}, ["_id"]).lean();

		console.log("User", userInfo)

		const res = await chai
			.request(baseUrl)
			.post("/api/v1/follows/" + userInfo?._id)
			.set({ Authorization: secondUser.body.token });

		res.body.should.be.a('object');
		assert.strictEqual(res.status, 201, "http status should be 201");
	});
});
