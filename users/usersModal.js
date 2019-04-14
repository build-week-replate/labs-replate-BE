const db = require("../data/dbConfig");

module.exports = {
  insert,
  getOne,
  getAll,
  getOneByEmail
};

async function insert(user) {
  const [id] = await db("users").insert(user);

  return getOne(id);
}

function getOne(id) {
  return db("users")
    .where({ id })
    .first();
}

function getOneByEmail(email) {
  return db("users")
    .where({ email })
    .first();
}

function getAll() {
  return db("users");
}
