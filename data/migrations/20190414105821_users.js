exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("users", tbl => {
      tbl.increments();

      tbl
        .string("name", 128)
        .notNullable()
        .unique();

      tbl
        .string("email", 128)
        .notNullable()
        .unique();

      tbl.string("phone").notNullable();

      tbl.string("type", 128).notNullable();

      tbl.string("password", 128).notNullable();
    })
    .createTable("locations", tbl => {
      tbl.increments();

      tbl.string("office_name", 128).notNullable();
      tbl.string("office_address", 128).notNullable();
      tbl.string("office_email", 128);

      tbl
        .integer("company_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    })
    .createTable("schedules", tbl => {
      tbl.increments();

      tbl.string("pickup_name", 128).notNullable();
      tbl.string("pickup_date", 128).notNullable();
      tbl.string("pickup_time", 128).notNullable();
      tbl.string("pickup_comment", 255).notNullable();
      tbl.string("pickup_additional_comment", 255);
      tbl.boolean("taken").notNullable();

      tbl
        .integer("volunteer_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");

      tbl
        .integer("location_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("locations")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");

      tbl
        .integer("company_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists();
};
