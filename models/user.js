const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
    name: String,
    password: String,
    email: String,
    profile-pic: String,
    skills: [String]
    rating: Number,
    services-done: Number,
    services-doing: Number,
    services-asked: Number
});

const User = mongoose.model("User", userSchema);
module.exports = User;
