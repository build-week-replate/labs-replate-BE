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
  return db("schedules")
    .insert(location)
    .returning("id");
}

function getOneById(id) {
  return db("schedules")
    .where({ id })
    .innerJoin("locations", "schedules.location_id", "=", "locations.id")
    .first();
}

function getAllByCompanyId(id) {
  return db("schedules")
    .where({ company_id: id })
    .innerJoin("locations", "schedules.location_id", "=", "locations.id");
}

function getAll() {
  return db("schedules").innerJoin(
    "locations",
    "schedules.location_id",
    "=",
    "locations.id"
  );
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
