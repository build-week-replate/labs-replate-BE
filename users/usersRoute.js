const express = require("express");
const Users = require("./usersModal");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/", async (req, res) => {
  const { type, name, email, password, phone } = req.body;

  if (!type || !name || !email || !password || !phone) {
    return res.status(400).json({ msg: "Bad request" });
  }

  req.body.password = bcrypt.hashSync(password, 8);

  try {
    const user = await Users.insert(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await Users.getAll();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await Users.getOne(req.params.id);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
