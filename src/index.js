const express = require("express");
require('dotenv').config()
const app = express();
const port = process.env.PORT || 3333;
app.use(express.json());

app.listen(port, () => {
    console.info(`Listening on http://localhost:${port}`);
});

const db = require("./dbConnect.js");

app.get("/users", db.getUsers)



