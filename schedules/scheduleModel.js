const db = require('../data/dbConfig')

module.exports = {
  insert,
  getOneById,
  getAllByCompanyId,
  getAll,
  update,
  remove
}

const joinQuery = 'schedules.id, schedules.pickup_name, schedules.pickup_date, schedules.pickup_time, schedules.pickup_comment, schedules.pickup_additional_comment, schedules.taken, schedules.volunteer_id, schedules.location_id, schedules.company_id, locations.office_name, locations.office_address, locations.office_email'.split(
  ', '
)

function insert(location) {
  return db('schedules')
    .insert(location)
    .returning('id')
}

function getOneById(id) {
  return db('schedules')
    .innerJoin('locations', 'schedules.location_id', '=', 'locations.id')
    .where({ 'schedules.id': id })
    .select(joinQuery)
    .first()
}

function getAllByCompanyId(id) {
  return db
    .select(joinQuery)
    .from('schedules')
    .where({ company_id: id })
    .innerJoin('locations', 'schedules.location_id', '=', 'locations.id')
}

function getAll() {
  return db('schedules')
    .innerJoin('locations', 'schedules.location_id', '=', 'locations.id')
    .select(joinQuery)
}

function update(id, fields) {
  return db('schedules')
    .where({ id })
    .update(fields)
}

function remove(id) {
  return db('schedules')
    .delete()
    .where({ id })
}
