const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
    name: String,
    password: String,
    email: String,
    location: String,
    profilePic: String,
    skills: [String],
    servicesDone: [
        {
            datePosted: Date,
            deadline: Date,
            dateFinished: Date,
            description: String,
            category: String,
            difficulty: Number
        }
    ],
    servicesDoing: [
        {
            datePosted: Date,
            deadline: Date,
            dateFinished: Date,
            description: String,
            category: String,
            difficulty: Number
        }
    ],
    servicesAsked: [
        {
            datePosted: Date,
            deadline: Date,
            dateFinished: Date,
            description: String,
            category: String,
            difficulty: Number
        }
    
    ]
});

const User = mongoose.model("User", userSchema);
module.exports = User;
