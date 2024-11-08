exports.up = function (knex) {
  // Add the extension only if it doesn't exist
  return knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .then(() => knex.schema
      .createTable("placks", function (table) {
        table.uuid("id").notNullable().defaultTo(knex.raw('uuid_generate_v4()')).primary();
        table.string('name').notNullable();          // Nom du plack
        table.string('description');                       // Description du plack
        table.integer('quantity').unsigned().notNullable();// Quantité en plack
        table.decimal('unit_price', 10, 2).notNullable();  // Prix unitaire
        table.string('location');                          // Emplacement du plack
        table.string('provider').notNullable();            // Fournisseur du plack
        table.date('expiration_date');                     // Date d'expiration (si applicable)
        table.string('status').defaultTo('available');     // Statut du plack (ex : disponible, épuisé)
        table.timestamps(true, true);  // Raccourci pour ajouter les champs created_at et updated_at
      })
      .createTable("placksarticles", function (table) {
        table.uuid("id").notNullable().defaultTo(knex.raw('uuid_generate_v4()')).primary();
        table.uuid('articleId').unsigned().references('id').inTable('articles').onDelete('CASCADE');
        table.uuid('placksId').unsigned().references('id').inTable('placks').onDelete('CASCADE');
        table.integer("status").defaultTo(0);
        table.timestamps(true, true);                       // Dates de création et mise à jour
      })
    );
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("placksarticles")  // Drop placksarticles table first
    .dropTableIfExists("placks");          // Then drop placks table
};