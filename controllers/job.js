// dependencies
const express = require("express");
const router = express.Router();
const Job = require("../models/job.js"); 

// routes
// index route
router.get("/", (request, response) => {
    Job.find({}, (error, allJobs) => {
        response.render("jobs.ejs", {
            Jobs: allJobs
        });
    });
});

// new route
router.get("/new", (request, response) => {
    response.render("newJob.ejs", {
        currentUser: request.session.currentUser
    });
});
router.post("/", (request, response) => {
    request.body.skillsRequired = request.body.skillsRequired.split(",");
    request.body.finished = false;
    request.body.author = request.session.currentUser.name;
    Job.create(request.body, (error, newJob) => {
        response.redirect("/job");
    })
});

// show route
router.get("/:id", (request, response) => {
    Job.findById(request.params.id, (error, currentJob) => {
        response.render("jobDetails.ejs", {
            Job: currentJob
        });
    });
});

// edit route

// job done route

// delete route

module.exports = router;
