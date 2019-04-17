const knex = require("knex");
const config = require("../knexfile");

const env = "testing";

module.exports = knex(config[env]);
