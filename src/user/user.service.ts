export {};
const { model } = require("mongoose");
const User = model("User");

exports.addUser = async (data: any) => {
    return await User.create(data);
}

exports.getUsers = async (filter: any) => {
    return await User.find(filter, ["fullName", "email", "age"]).lean();
}
