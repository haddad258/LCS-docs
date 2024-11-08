exports.up = function (knex) {
  // Add the extension only if it doesn't exist
  return knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .then(() => knex.schema
      .createTable("providers", function (table) {
        table.uuid("id").notNullable().defaultTo(knex.raw('uuid_generate_v4()')).primary();
        table.string("firstname");  // Make firstname mandatory
        table.string("lastname");   // Make lastname mandatory
        table.string("username").unique().notNullable();  // Unique and mandatory username
        table.string("cin").unique().notNullable();  // Unique and mandatory username
        table.string("description").defaultTo('');  // Default description to an empty string
        table.string("privilege").defaultTo("provider");  // Keep default as provider
        table.integer("status").defaultTo(0);  // Default status (e.g., active = 1, inactive = 0)
        table.string("email").unique().notNullable();  // Unique and mandatory email
        table.string("password").notNullable();  // Mandatory password field for security
        table.timestamp("last_login");  // Track last login time
        table.string("phone_number").unique();  // Add unique phone number (optional)
        table.string("address");  // Optional address field for provider
        table.string("image");  // Optional address field for provider
        table.timestamp("email_verified_at");  // To track email verification date
        table.timestamp("phone_verified_at");  // To track phone verification date
        table.boolean("is_verified").defaultTo(false);  // Field to indicate if provider is verified
        table.timestamps(true, true);  // created_at and updated_at
      })
      .createTable("providerarticles", function (table) {
        table.uuid("id").notNullable().defaultTo(knex.raw('uuid_generate_v4()')).primary();
        table.uuid('articleId').unsigned().references('id').inTable('articles').onDelete('CASCADE');
        table.uuid('providersId').unsigned().references('id').inTable('providers').onDelete('CASCADE');
        table.integer("status").defaultTo(0);
        table.timestamps(true, true);                       // Dates de création et mise à jour
      })
      .createTable("providercalendar", function (table) {
        table.uuid("id").notNullable().defaultTo(knex.raw('uuid_generate_v4()')).primary();
        table.uuid('providersId').unsigned().references('id').inTable('providers').onDelete('CASCADE');
        table.string("start").unique();  // Add start promotions (optional)
        table.string("end").unique();  // Add end promostions (optional)
        table.integer("status").defaultTo(0);
        table.timestamps(true, true);                       // Dates de création et mise à jour
      })
      .createTable("publications", function (table) {
        table.uuid("id").notNullable().defaultTo(knex.raw('uuid_generate_v4()')).primary();
        table.uuid('providersId').unsigned().references('id').inTable('providers').onDelete('CASCADE');
        table.text("content");                           // Contenu de la publication (texte)
        table.text("hashtag");                           // Contenu de la publication (texte)
        table.string("image_url");                       // URL de l'image de la publication
        table.string("video_url");                       // URL de la vidéo de la publication
        table.integer("interactions").defaultTo(0);             // Nombre de interactions
        table.integer("counts").defaultTo(0);    // Nombre de commentaires
        table.integer("status").defaultTo(0);
        table.timestamps(true, true);                       // Dates de création et mise à jour
      })
    );
};
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("publications")    // Drop publications table first
    .dropTableIfExists("providercalendar") // Drop providercalendar table next
    .dropTableIfExists("providerarticles") // Drop providerarticles table next
    .dropTableIfExists("providers")        // Finally, drop providers table
};