const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
    name: String,
    password: String,
    email: String,
    location: String,
    profilePic: String,
    skills: [String],
    jobsDone: [String],
    jobsDoing: [String],
    jobsAsked: [String],
    balance: Number
});

const User = mongoose.model("User", userSchema);
module.exports = User;
