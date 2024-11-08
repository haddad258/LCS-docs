exports.up = function (knex) {
  // Add the extension only if it doesn't exist
  return knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .then(() => knex.schema
      .createTable("privilege", function (table) {
        table.string("privilege").unique();
        table.string("description");
        table.timestamps(true, true);  // Raccourci pour ajouter les champs created_at et updated_at
      })
      .createTable("users", function (table) {
        table.uuid("id").notNullable().defaultTo(knex.raw('uuid_generate_v4()')).primary();
        table.string("name");
        table.string("lastname");
        table.string("username").unique();
        table.string("description");
        table.string("privilege");
        table.integer("status").defaultTo(0);
        table.string("email").unique();  // Exemple d'un champ email unique
        table.string("password");  // Exemple d'un champ pour stocker le mot de passe
        table.boolean("is_admin").defaultTo(false);  // Exemple d'un champ pour indiquer si l'utilisateur est un administrateur
        table.timestamp("last_login");  // Exemple d'un champ pour enregistrer la dernière connexion
        table.timestamps(true, true);  // Raccourci pour ajouter les champs created_at et updated_at
      })
      .createTable("organization_gen_info", function (table) {
        table.uuid("id").notNullable().defaultTo(knex.raw('uuid_generate_v4()')).primary();
        table.string("name");
        table.string("phone");
        table.integer("status").defaultTo(0);
        table.timestamps(true, true);  // created_at and updated_at

      })
      .createTable("paymentmode", function (table) {
        table.uuid("id").notNullable().defaultTo(knex.raw('uuid_generate_v4()')).primary();
        table.string("name");
        table.string("description");
        table.string("secretId");
        table.string("userId");
        table.string("accountId");
        table.string("tokenId");
        table.string("authO");
        table.string("attributionId");
        table.string("requestId");
        table.string("images");
        table.integer("status").defaultTo(0);
        table.timestamps(true, true);  // created_at and updated_at

      })

    );
};
//////////update migrations downs////////////

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("paymentmode")
    .dropTableIfExists("organization_gen_info")
    .dropTableIfExists("users")
    .dropTableIfExists("privilege")
    .then(() => knex.raw('DROP EXTENSION IF EXISTS "uuid-ossp"'));
};