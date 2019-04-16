const db = require("../data/dbConfig");

//for cleaning up the db
// const knexCleaner = require("knex-cleaner");

// knexCleaner.clean(db);

module.exports = {
  insert,
  getOne,
  getAll,
  getOneByEmail
};

async function insert(user) {
  const [id] = await db("users").insert(user);

  return db("users")
    .where({ id })
    .first();
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
