require("../src/bootstrap");
const assert = require('assert');

const { connect, clearDatabase, closeDatabase } = require('../test/db.ts');
const userService = require("../src/user/user.service");


/**
 * Create user
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
 * Connect to a new in-memory database before running any tests.
 */

before(async () => await connect());

/**
 * Clear all test data after every test.
 */
afterEach(async () => await clearDatabase());

/**
 * Remove and close the db and server.
 */
after(async () => await closeDatabase());

/**
 * User test suite.
 */
describe('user ', () => {

	/**
	 * Tests that a valid user can be created without throwing any errors.
	 */

	it('can be created correctly', (done) => {
		userService.addUser(users).then(data => {
			assert.equal(data[0].age, users[0].age);
			assert.equal(data[1].fullName, users[1].fullName);
			assert(!data.isNew);
			done()
		}).catch(done)
	});

	it('can be created correctly but failed for extra space in fullName', (done) => {
		userService.addUser(users).then(data => {
			assert.notEqual(data[0].fullName, users[0].fullName);
			assert(!data.isNew);
			done()
		}).catch(done)
	});

});
