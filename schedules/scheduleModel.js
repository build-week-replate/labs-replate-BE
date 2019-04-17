const db = require("../data/dbConfig");

module.exports = {
  insert,
  getOneById,
  getAllByCompanyId,
  getAll,
  update,
  remove
};

function insert(location) {
  return db("schedules").insert(location);
}

function getOneById(id) {
  return db("schedules")
    .where({ id })
    .first();
}

function getAllByCompanyId(id) {
  return db("schedules").where({ company_id: id });
}

function getAll() {
  return db("schedules");
}

function update(id, fields) {
  return db("schedules")
    .where({ id })
    .update(fields);
}

function remove(id) {
  return db("schedules")
    .delete()
    .where({ id });
}
