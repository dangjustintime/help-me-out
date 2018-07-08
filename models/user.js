const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
    name: String,
    password: String,
    email: String,
    location: String,
    profilePic: String,
    skills: [String],
    friends: [String]
});

const User = mongoose.model("User", userSchema);
module.exports = User;
