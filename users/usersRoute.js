const express = require("express");
const Users = require("./usersModal");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticate = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", async (req, res) => {
  const { type, name, email, password, phone } = req.body;

  if (!type || !name || !email || !password || !phone) {
    return res.status(400).json({ msg: "Bad request" });
  }

  req.body.password = bcrypt.hashSync(password, 8);

  try {
    const user = await Users.insert(req.body);

    const token = generateToken(user);

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/", authenticate, async (req, res) => {
  try {
    const users = await Users.getAll();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/:id", authenticate, async (req, res) => {
  try {
    const user = await Users.getOne(req.params.id);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Bad request" });
  }

  try {
    const user = await Users.getOneByEmail(email);
    console.log(user);

    if (bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);

      res.status(200).json({ user, token });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    name: user.name,
    type: user.type
  };

  const jwtKey = process.env.JWT_SECRET || "placeholder secret";

  const secret = jwtKey;

  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;
