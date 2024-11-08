exports.up = function (knex) {
  // Add the extension only if it doesn't exist
  return knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .then(() => knex.schema
      .createTable("advertisements", function (table) {
        table.uuid("id").notNullable().defaultTo(knex.raw('uuid_generate_v4()')).primary();
        table.string("name");                           // Contenu de la publication (texte)
        table.text("content");                           // Contenu de la publication (texte)
        table.string("type");                           // Contenu de la publication (texte)
        table.string("images");                           // Contenu de la publication (texte)
        table.boolean("is_active").defaultTo(true);      // Statut de la publication (active ou non)
        table.timestamps(true, true);  // Raccourci pour ajouter les champs created_at et updated_at
      })
      .createTable("discounts", function (table) {
        table.uuid("id").notNullable().defaultTo(knex.raw('uuid_generate_v4()')).primary();
        table.string('name').notNullable();                 // Nom du discount
        table.string('description').notNullable();                 // Nom du discount
        table.enu('type', ['percentage', 'flat']).notNullable(); // Type de discount (pourcentage ou montant fixe)
        table.decimal('value', 10, 2).notNullable();        // Valeur du discount
        table.date('start_date').notNullable();             // Date de début du discount
        table.date('end_date').notNullable();               // Date de fin du discount
        table.boolean('active').defaultTo(true);            // Indicateur si le discount est actif ou non
        table.string('applicable_to');                      // Applicable à (produit spécifique, catégorie, etc.)
        table.timestamps(true, true);                       // Dates de création et mise à jour
      })
      .createTable("discountarticles", function (table) {
        table.uuid("id").notNullable().defaultTo(knex.raw('uuid_generate_v4()')).primary();
        table.uuid('articleId').unsigned().references('id').inTable('articles').onDelete('CASCADE');
        table.uuid('discountsId').unsigned().references('id').inTable('discounts').onDelete('CASCADE');
        table.integer("status").defaultTo(0);
        table.timestamps(true, true);                       // Dates de création et mise à jour
      })

    );
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("discountarticles")  // Drop discountarticles table first
    .dropTableIfExists("discounts")         // Then drop discounts table
    .dropTableIfExists("advertisements");    // Finally, drop advertisements table
};