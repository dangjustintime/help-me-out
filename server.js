// dependencies
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (request, response) => {
    response.send("hello");
});

// listening to port
app.listen(PORT, () => {
    console.log("listening to port", PORT);
});

