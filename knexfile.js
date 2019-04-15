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
    client: "postgresql",
    connection: {
      database: "d4qq283pkq0v9c",
      user: "ctanqwofacgvba",
      password:
        "0bd0ce14117dcd1f8a85c900478d28d753d1d6ddececab2b399969d7b91bff23"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./data/migrations"
    }
  }
};
