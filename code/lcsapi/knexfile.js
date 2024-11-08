module.exports = {
  development: {
    client: "postgresql",
    connection: {
      // filename: "./dev.postgresql",
      host: "127.0.0.1",
      port: "5432",
      user: "postgres",
      password: "psql",
     // database: "testdel",
      database: "esim_migration_2",
    },
 
  },
  test: {
    client: "postgresql",
    connection: {
      // filename: "./dev.postgresql",
      host: "127.0.0.1", /// env dev
      port: "5432",
      user: "postgres",
      password: "psql",
     // database: "testdel",
      database: "esim_migration_2",
    },
 
  },
  
};