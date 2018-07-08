// dependencies
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const mongoUri =  process.env.MONGODB_URI || 'mongodb://localhost:27017/grocery_app_dev';
const User = require("./models/user.js");
const userController = require("./controllers/user.js");

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use("/user/", userController);

// test route
app.get("/", (request, response) => {
    response.send("chee chee boo boo");
});

// listening to port
app.listen(PORT, () => {
    console.log("listening to port", PORT);
});

//connect to mongodb
mongoose.connect(mongoUri, { useNewUrlParser: true });
mongoose.connection.once("open", () => {
    console.log("connected to mongoose!!!!!");
});
