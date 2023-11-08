const express = require("express");
const app = express();
const User = require("../models/User");
const db = require("../db/connection");
const userRouter = require("../routes/users");

app.use("/users", userRouter);

module.exports = app;
