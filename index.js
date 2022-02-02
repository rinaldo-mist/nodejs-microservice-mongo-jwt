'use strict';

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 8000;

app.get("/", (req, res) => {
    res.json({ message: "This API is working" });
});

app.listen(PORT, (req, res) => {
    console.log(`Listen on port ${PORT} `);
});