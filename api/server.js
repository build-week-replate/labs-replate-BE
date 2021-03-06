const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const usersRoute = require("../users/usersRoute");
const locationsRouter = require("../locations/locationsRoute");
const schedulesRouter = require("../schedules/schedulesRouter");
require("dotenv").config();

const server = express();
server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/users", usersRoute);
server.use("/api/locations", locationsRouter);
server.use("/api/schedules", schedulesRouter);

server.get("/", (req, res) => {
  res.send(`<h1>Welcome to Replate backend server, built in node with express</h1>
    <p>you can find the github repo by clicking <a href="https://github.com/build-week-replate/labs-replate-BE">here</a></p>`);
});

module.exports = server;
