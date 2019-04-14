const db = require("../data/dbConfig");

module.exports = {
  insert,
  getOne,
  getAll
};

function insert(user) {
  return db("users").insert(user);
}

function getOne(id) {
  return db("users")
    .where({ id })
    .first();
}

function getAll() {
  return db("users");
}
