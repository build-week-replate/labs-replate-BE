const db = require("../data/dbConfig");

module.exports = {
  insert,
  getOneById,
  getAllByCompanyId
};

function insert(location) {
  return db("locations").insert(location);
}

function getOneById(id) {
  return db("locations")
    .where({ id })
    .first();
}

function getAllByCompanyId(id) {
  return db("locations").where({ company_id: id });
}
