const localPg = {
  host: "localhost",
  database: "replate",
  user: "vlad",
  password: "turcan"
};
const productionDbConnection = process.env.DATABASE_URL || localPg;

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/replate.db3"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  },
  testing: {
    client: "sqlite3",
    connection: {
      filename: "./data/test.db3"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  },
  //for later
  production: {
    client: "pg",
    connection: productionDbConnection,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  }
};
