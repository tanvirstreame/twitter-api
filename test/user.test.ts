require("../src/bootstrap");
const assert = require('assert');

const { connect, clearDatabase, closeDatabase } = require('../test/db.ts');


/**
 * Create user
 */

const users = [
	{
		fullName: "Jhon",
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

});