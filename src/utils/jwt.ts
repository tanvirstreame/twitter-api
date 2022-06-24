export {};
const crypto = require("crypto");
const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const pathToPrivKey = path.join(__dirname, "..", "..", "keys", "id_rsa_priv.pem");
const PRIV_KEY = fs.readFileSync(pathToPrivKey, "utf8");

const pathPubToKey = path.join(__dirname, "..", "..", "keys", "id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pathPubToKey, "utf8");

/**
 * -------------- HELPER FUNCTIONS ----------------
 */

/**
 *
 * @param {*} password - The plain text password
 * @param {*} hash - The hash stored in the database
 * @param {*} salt - The salt stored in the database
 *
 * This function uses the crypto library to decrypt the hash using the salt and then compares
 * the decrypted hash/salt with the password that the user provided at login
 */
function validPassword(password, hash, salt) {
	var hashVerify = crypto
		.pbkdf2Sync(password, salt, 10000, 64, "sha512")
		.toString("hex");
	return hash === hashVerify;
}

/**
 *
 * @param {*} password - The password string that the user inputs to the password field in the register form
 *
 * This function takes a plain text password and creates a salt and hash out of it.  Instead of storing the plaintext
 * password in the database, the salt and hash are stored for security
 *
 */
function genPassword(password) {
	var salt = crypto.randomBytes(32).toString("hex");
	var genHash = crypto
		.pbkdf2Sync(password, salt, 10000, 64, "sha512")
		.toString("hex");

	return {
		salt: salt,
		hash: genHash,
	};
}

/**
 * @param {*} user - The user object.  We need this to set the JWT `sub` payload property to the MongoDB user ID
 */
function issueJWT(user, expiresTime) {
	const _id = user._id;
	// const role = user.role;

	let expiresIn = {}

	if (expiresTime) {
		expiresIn = {
			expiresIn: expiresTime
		}
	}

	const payload = {
		sub: _id,
		iat: new Date().getTime() / 1000,
	};

	const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
		...expiresIn,
		algorithm: "RS256",
	});


	return {
		token: "Bearer " + signedToken,
		...expiresIn,
	};
}

const verifyJWT = async (accessToken) => {
	try {
		const { sub, exp, role } = await jsonwebtoken.verify(accessToken, PUB_KEY);
		return {
			sub: sub,
			exp: exp,
			role: role,
		};
	}
	catch (err) {
		return false;
	}
};

module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;
module.exports.issueJWT = issueJWT;
module.exports.verifyJWT = verifyJWT;
