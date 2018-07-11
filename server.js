// dependencies
const express = require("express");
const session = require("express-session");
const methodOverride = require("method-override");
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const mongoUri =  process.env.MONGODB_URI || 'mongodb://localhost:27017/grocery_app_dev';
const User = require("./models/user.js");
const Job = require("./models/job.js");
const userController = require("./controllers/user.js");
const sessionController = require("./controllers/session.js");
const jobController = require("./controllers/job.js");

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
    secret: "maytheforcebewithyou",
    resave: false,
    saveUninitialized: false
}));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use("/user/", userController);
app.use("/job/", jobController);
app.use("/session/", sessionController);

// home route
app.get("/", (request, response) => {
    Job.find({}, (error, allJobs) => {
        response.render("home.ejs", {
            Jobs: allJobs,
            currentUser: request.session.currentUser
        });
    });
});

// listening to port
app.listen(PORT, () => {
    console.log("listening to port", PORT);
});

//connect to mongodb
mongoose.connect(mongoUri, { useNewUrlParser: true });
mongoose.connection.once("open", () => { console.log("connected to mongoose!!!!!");
});
