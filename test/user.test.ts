export { };
require("../src/bootstrap");
const assert = require('assert');
import { faker } from '@faker-js/faker';

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

describe('user ', () => {

	/**
	 * Tests that a valid user can be created without throwing any errors.
	 */

	it('can be created correctly', async () => {
		const  { userData } = await userService.addUser(users[0]);
		assert.equal(userData.age, users[0].age);
		assert.equal(userData.phone, users[0].phone);
		assert(!userData.isNew);
		
	});


	it('can be created correctly but failed for extra space in fullName', async () => {
		const  { userData } = await userService.addUser(users[0]);
		assert.notEqual(userData.fullName, users[0].fullName);
		assert(!userData.isNew);
	});

});
