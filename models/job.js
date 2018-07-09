const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = Schema({
    title: String,
    description: String,
    author: String,
    helper: String,
    deadline: Date,
    location: String,
    skillsRequired: [String],
    img: String,
    finished: Boolean,
    price: Number
});

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;
