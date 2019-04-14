exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", tbl => {
    tbl.increments();

    tbl
      .string("name", 128)
      .notNullable()
      .unique();

    tbl
      .string("email", 128)
      .notNullable()
      .unique();

    tbl.integer("phone").notNullable();

    tbl.string("type", 128).notNullable();

    tbl.string("password", 128).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists();
};
