exports.up = function (knex) {
    // Add the extension only if it doesn't exist
    return knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
        .then(() => knex.schema
            .createTable("statusorders", function (table) {
                table.uuid("id").notNullable().defaultTo(knex.raw('uuid_generate_v4()')).primary();
                table.string('name');                           // Description of the order
                table.string('description');                           // Description of the order
                table.integer("events").defaultTo(0);                 // Status (same field kept for backward compatibility)
                table.integer("status").defaultTo(0);                 // Status (same field kept for backward compatibility)
                table.timestamps(true, true);                         // Created at and updated at timestamps
            })
            .createTable("orders", function (table) {
                table.uuid("id").notNullable().defaultTo(knex.raw('uuid_generate_v4()')).primary();
                table.uuid('paymentstatusId').references('id').inTable('statusorders').onDelete('CASCADE');  // Foreign key to articles
                table.uuid('customerId').references('id').inTable('customers').onDelete('CASCADE'); // Foreign key to customers table
                table.uuid('customer').references('id').inTable('customers').onDelete('CASCADE'); // Foreign key to customers table
                table.string("order_number").unique()                      // Description of the order
                table.decimal('price', 10, 2).notNullable().defaultTo(0);;      // Unit price
                table.integer('quantity').unsigned().notNullable().defaultTo(1);;    // Quantity of the order
                table.string('unit_price').defaultTo("$");                    // Name of the order
                table.string('name');                    // Name of the order
                table.string('description');
                table.string('location');                              // Location associated with the order
                table.string('provider').defaultTo('owner');;                // Provider of the order
                table.date('expiration_date');                         // Expiration date (if applicable)
                table.string('note');
                table.string('tracking_number');                       // Shipping tracking number
                table.timestamps(true, true);  // Created at and updated at timestamps
            })
            .createTable("ordersdetails", function (table) {
                table.uuid("id").notNullable().defaultTo(knex.raw('uuid_generate_v4()')).primary();
                table.uuid('articleId').references('id').inTable('articles').onDelete('CASCADE');  // Foreign key to articles
                table.uuid('placksId').references('id').inTable('placks').onDelete('CASCADE');     // Foreign key to placks
                table.uuid('providerId').references('id').inTable('providers').onDelete('CASCADE'); // Foreign key to provider
                table.uuid('ordersId').references('id').inTable('orders').onDelete('CASCADE'); // Foreign key to provider
                table.integer("quantity").unsigned().notNullable();   // Quantity of items
                table.decimal('price', 10, 2).notNullable();          // Price of the item in the order
                table.integer("status").defaultTo(0);                 // Status (same field kept for backward compatibility)
                table.timestamps(true, true);                         // Created at and updated at timestamps
            })

            .then(() => {
                // Créer une séquence pour l'auto-incrémentation de order_number
                return knex.raw('CREATE SEQUENCE order_number_seq START WITH 100');
            })
            .then(() => {
                // Créer un trigger pour utiliser la séquence lors de l'insertion
                return knex.raw(`
            CREATE OR REPLACE FUNCTION set_order_number() RETURNS TRIGGER AS $$
            BEGIN
              NEW.order_number := nextval('order_number_seq');
              RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;
    
            CREATE TRIGGER set_order_number_trigger
            BEFORE INSERT ON orders
            FOR EACH ROW
            EXECUTE FUNCTION set_order_number();
          `);
            })
        )
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists("ordersdetails")   // Drop ordersdetails table first
        .dropTableIfExists("orders")          // Then drop orders table
        .dropTableIfExists("statusorders")     // Finally, drop statusorders table
        .then(() => {
            // Drop the sequence for order_number
            return knex.raw('DROP SEQUENCE IF EXISTS order_number_seq');
        });
};
