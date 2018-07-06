// dependencies
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const mongoUri =  process.env.MONGODB_URI || 'mongodb://localhost:27017/grocery_app_dev';

app.get("/", (request, response) => {
    response.send("working");
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
