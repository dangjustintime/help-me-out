// dependencies
const express = require("express");
const router = express.Router();
const Job = require("../models/job.js"); 

// routes
// index route
router.get("/", (request, response) => {
    response.render("jobs.ejs");
});

// new route
router.get("/new", (request, response) => {
    response.render("newJob.ejs", {
        currentUser: request.session.currentUser
    });
});
router.post("/", (request, response) => {
});

// show route

// edit route

// job done route

// delete route

module.exports = router;
