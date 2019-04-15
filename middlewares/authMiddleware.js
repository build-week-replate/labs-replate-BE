const jwt = require("jsonwebtoken");

const jwtKey = process.env.JWT_SECRET || "placeholder secret";

function authenticate(req, res, next) {
  const token = req.get("Authorization");

  if (token) {
    jwt.verify(token, jwtKey, (err, decoded) => {
      if (err) {
        res.status(401).json(err);
      }

      req.decoded = decoded;

      next();
    });
  } else {
    res.status(401).json({ err: "No token provided" });
  }
}

module.exports = authenticate;
