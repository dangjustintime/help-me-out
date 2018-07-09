const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const bcrypt = require("bcrypt");

// sign in route
router.post("/", (request, response) => {
    User.findOne({ email: request.body.email }, (error, foundUser) => {
        if (request.body.password == foundUser.password) {
            request.session.currentUser = foundUser;
            response.redirect("/");
        } else {
            response.send("wrong password");
        }
    });
});

// sign out route
router.delete("/", (request, response) => {
    request.session.destroy(() => {
        response.redirect("/");
    })
});

module.exports = router;
