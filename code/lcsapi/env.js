const env = {
  key: "MySuP3R_z3kr3t.",
  port: 8009,
  port1: 3002,

  databaseConfig: {
    client: "postgresql",
    connection: {
      host: "localhost",
      port: "5432",
      user: "postgres",
      password: "psql",
      database: "testlogi",
    },
    debug: true,
    migrations: {
      directory: "migrations",
    },
    seeds: {
      directory: "migrations/seeds", // Specify the subfolder path for seeds
    },
  },
  assetServerUrl: "http://localhost",
  assetDirectory: "\\home\\\\Documents\\",
};

module.exports = env;
