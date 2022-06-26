require('../src/app');
const userService = require("../src/user/user.service");
const tweetService = require("../src/tweet/tweet.service");
const followService = require("../src/follow/follow.service");
import { faker } from '@faker-js/faker';

(async () => {
	let userList = [];
	for (let i = 0; i < 40; i++) {
		const { userData } = await userService.addUser({
			fullName: faker.name.findName(),
			phone: faker.phone.number(),
			email: faker.internet.email(),
			age: 28,
			gender: "male",
			role: "public",
			status: "verified",
			avatar: "",
			password: "1234"
		})
		userList.push(userData);
	}

	let tweetUserCount = 0;
	for (let i = 0; i < 240; i++) {
		if (i % 6 == 0) {
			tweetUserCount++;
		}
		if (userList[tweetUserCount]?._id) {
			await tweetService.addTweet({
				user: userList[tweetUserCount]?._id,
				post: faker.lorem.paragraph()
			})
		}
	}

	for (let i = 1; i < 39; i++) {

		await followService.addFollow({
			followee: userList[i],
			follower: userList[0],
		})

	}
	console.log("first user", userList[0]);

	console.log("Seeding completed")


})()