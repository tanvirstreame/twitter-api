export {};
require("../src/bootstrap");
const assert = require('assert');
const chai = require('chai');
const chaiHttp = require("chai-http");
let should = chai.should();

import { faker } from '@faker-js/faker';

chai.use(chaiHttp);

const baseUrl = "http://127.0.0.1:8080"

const userService = require("../src/user/user.service");

/**
 * Create user
 */

const users = [
	{
		fullName: faker.name.findName() + " ",
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
 * User test suite.
 */

describe('User ', () => {

	/**
	 * Tests that a valid user can be created without throwing any errors.
	 */

	it('User can be created successfully', async () => {
		const  { userData } = await userService.addUser(users[0]);
		assert.equal(userData.age, users[0].age);
		assert.equal(userData.phone, users[0].phone);
		assert(!userData.isNew);
		
	});


	it('User can be created successfully but failed to match for extra space in fullName', async () => {
		const  { userData } = await userService.addUser(users[0]);
		assert.notEqual(userData.fullName, users[0].fullName);
		assert(!userData.isNew);
	});

	it("User sign up can sign up succuessfully", async () => {
		require("../src/app")
		const res = await chai
			.request(baseUrl)
			.post("/api/v1/users/signup")
			.send(users[1]);
		assert.strictEqual(res.status, 201, "http status should be 201");
		res.body.should.be.a('object');
		res.should.to.be.json;
		assert.strictEqual(res.body.success, true, "This should be true");
	});

	it("User login api failed if no user found", async () => {
		require("../src/app")
		const res = await chai
			.request(baseUrl)
			.post("/api/v1/users/login")
			.send(users[1]);

		assert.strictEqual(res.status, 404, "http status should be 404");
		res.body.should.be.a('object');
		res.should.to.be.json;
		assert.strictEqual(res.body.success, false, "This should be false");
	});


	it("User login success", async () => {
		require("../src/app")

		await chai
			.request(baseUrl)
			.post("/api/v1/users/signup")
			.send(users[1]);

		const res = await chai
			.request(baseUrl)
			.post("/api/v1/users/login")
			.send(users[1]);

		assert.strictEqual(res.status, 200, "http status should be 200");
		res.body.should.be.a('object');
		res.should.to.be.json;
		res.body.should.have.property('success');
		assert.strictEqual(res.body.success, true, "This should be true");
	});


});
