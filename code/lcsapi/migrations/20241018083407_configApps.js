exports.up = function (knex) {
    // Add the extension only if it doesn't exist
    return knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
        .then(() => knex.schema
            .createTable("categories", function (table) {
                table.uuid("id").notNullable().defaultTo(knex.raw('uuid_generate_v4()')).primary();
                table.string("name").unique();
                table.string("description");
                table.string("images");
                table.timestamps(true, true);  // Raccourci pour ajouter les champs created_at et updated_at
            })
            .createTable("itemkits", function (table) {
                table.uuid("id").notNullable().defaultTo(knex.raw('uuid_generate_v4()')).primary();
                table.string("name").unique();
                table.string("description");
                table.string("images");
                table.uuid("categories").references("id").inTable("categories");
                table.timestamps(true, true);  // Raccourci pour ajouter les champs created_at et updated_at
            })
            .createTable("items", function (table) {
                table.uuid("id").notNullable().defaultTo(knex.raw('uuid_generate_v4()')).primary();
                table.string("name").unique();
                table.string("description");
                table.string("images");
                table.uuid("itemkits").references("id").inTable("itemkits");
                table.timestamps(true, true);  // Raccourci pour ajouter les champs created_at et updated_at
            })
            .createTable("brands", function (table) {
                table.uuid("id").notNullable().defaultTo(knex.raw('uuid_generate_v4()')).primary();
                table.string("name").unique();
                table.string("description");
                table.string("types");
                table.string("images");
                table.timestamps(true, true);  // Raccourci pour ajouter les champs created_at et updated_at
            })
            .createTable("articles", function (table) {
                table.uuid("id").notNullable().defaultTo(knex.raw('uuid_generate_v4()')).primary();
                table.uuid('categorieId').unsigned().references('id').inTable('categories').onDelete('CASCADE');
                table.uuid('itemkitId').unsigned().references('id').inTable('itemkits').onDelete('CASCADE');
                table.uuid('itemId').unsigned().references('id').inTable('items').onDelete('CASCADE');
                table.uuid('brandId').unsigned().references('id').inTable('brands').onDelete('CASCADE');
                table.string('providersId').defaultTo("owner");
                table.string("name").unique();
                table.string("barcode").unique().nullable();          // Code-barres de l'article ou du produit
                table.integer("loyalty");
                table.string("description");
                table.decimal("price", 10, 2).notNullable();
                table.string("images");
                table.timestamps(true, true);  // Raccourci pour ajouter les champs created_at et updated_at
            })
            .createTable("articlesnotes", function (table) {
                table.uuid("id").notNullable().defaultTo(knex.raw('uuid_generate_v4()')).primary();
                table.uuid('customerId').unsigned().references('id').inTable('customers').onDelete('CASCADE');
                table.uuid('articleId').unsigned().references('id').inTable('articles').onDelete('CASCADE');
                table.string('ordersdetailId').defaultTo("owner");
                table.string('providersId').defaultTo("owner");
                table.string("name").unique();
                table.string("description");
                table.integer("note").defaultTo(0);
                table.timestamps(true, true);  // Raccourci pour ajouter les champs created_at et updated_at
            })
            .createTable("imagesarticles", function (table) {
                table.uuid("id").notNullable().defaultTo(knex.raw('uuid_generate_v4()')).primary();
                table.uuid('identity').unsigned().references('id').inTable('articles').onDelete('CASCADE');
                table.string('images');
                table.integer("status").defaultTo(0);
                table.timestamps(true, true);  // Raccourci pour ajouter les champs created_at et updated_at
            })



        );
};
exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists("imagesarticles")
        .dropTableIfExists("articlesnotes")
        .dropTableIfExists("articles")
        .dropTableIfExists("brands")
        .dropTableIfExists("items")
        .dropTableIfExists("itemkits")
        .dropTableIfExists("categories")
};