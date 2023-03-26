const express = require("express");
require("dotenv").config()
const jwt = require("jsonwebtoken");
const {connection} = require("./config/db");
const userRoute = require("./routes/user.routes");
const sprintRoute = require("./routes/sprint.routes");
const taskRoute = require("./routes/task.routes");
const bcrypt = require("bcrypt");
const cors = require("cors");
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.use("/user", userRoute);
app.use("/sprint", sprintRoute);
app.use("/task", taskRoute);

app.get("/", (req, res) => {
  res.send("Welcome");
});


app.get("/task", (req, res) => {
  res.send("Welcome to the task");
});


app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (err) {
    console.log("Error connecting to DB");
    console.log(err);
  }
  console.log(`Listening on PORT ${process.env.port}`);
});