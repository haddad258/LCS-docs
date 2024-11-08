exports.up = function (knex) {
  // Add the extension only if it doesn't exist
  return knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .then(() => knex.schema
      .createTable("customers", function (table) {
        table.uuid("id").notNullable().defaultTo(knex.raw('uuid_generate_v4()')).primary();
        table.string("firstname");  // Make firstname mandatory
        table.string("lastname");   // Make lastname mandatory
        table.string("username").unique().notNullable();  // Unique and mandatory username
        table.string("cin").unique().notNullable();  // Unique and mandatory username
        table.string("description").defaultTo('');  // Default description to an empty string
        table.string("privilege").defaultTo("customer");  // Keep default as customer
        table.integer("status").defaultTo(0);  // Default status (e.g., active = 1, inactive = 0)
        table.string("email").unique().notNullable();  // Unique and mandatory email
        table.string("password").notNullable();  // Mandatory password field for security
        table.timestamp("last_login");  // Track last login time
        table.string("phone_number").unique();  // Add unique phone number (optional)
        table.string("address");  // Optional address field for customer
        table.timestamp("email_verified_at");  // To track email verification date
        table.timestamp("phone_verified_at");  // To track phone verification date
        table.string("image");  // Optional address field for provider
        table.boolean("is_verified").defaultTo(false);  // Field to indicate if customer is verified
        table.timestamps(true, true);  // created_at and updated_at
      })
      .createTable("profilesId", function (table) {
        table.uuid("id").notNullable().defaultTo(knex.raw('uuid_generate_v4()')).primary();
        table.uuid('customerId').unsigned().references('id').inTable('customers').onDelete('CASCADE');
        table.string('lpa_esim');
        table.string('iccid');
        table.string('imsi');
        table.string('mnc');
        table.string('mcc');
        table.string('number');
        table.string('brand');
        table.string('ki');
        table.string('norm_ref');
        table.string('type').defaultTo('default');
        table.string('countryCode').defaultTo('default');
        table.string('operator').defaultTo('default');
        table.string('description').defaultTo('default');
        table.integer('status').defaultTo(0);
        table.date('activeDate');
        table.timestamps(true, true);  // created_at and updated_at
      })
      .createTable("subscriptions", function (table) {
        table.uuid("id").notNullable().defaultTo(knex.raw('uuid_generate_v4()')).primary();
        table.uuid('customerId').unsigned().references('id').inTable('customers').onDelete('CASCADE');
        table.uuid('profileId').unsigned().references('id').inTable('profilesId').onDelete('CASCADE');
        table.string('note').notNullable();
        table.timestamps(true, true);  // Raccourci pour ajouter les champs created_at et updated_at
      })
      .createTable("paymentcards", function (table) {
        table.uuid("id").notNullable().defaultTo(knex.raw('uuid_generate_v4()')).primary();
        table.uuid('customerId').unsigned().references('id').inTable('customers').onDelete('CASCADE');
        table.string("cardholder_name").notNullable();
        table.string("card_number_token").notNullable();  // Store tokenized card number for security
        table.string("expiration_date").notNullable();    // Format MM/YY or YYYY-MM
        table.string("card_type").notNullable();          // e.g., "Visa", "MasterCard"
        table.string("billing_address").nullable();       // Optional billing address
        table.timestamps(true, true);  // Raccourci pour ajouter les champs created_at et updated_at
      })
      .createTable("customerimages", function (table) {
        table.uuid("id").notNullable().defaultTo(knex.raw('uuid_generate_v4()')).primary();
        table.uuid('identity').unsigned().references('id').inTable('customers').onDelete('CASCADE');
        table.uuid('subscriptionId').unsigned().references('id').inTable('subscriptions').onDelete('CASCADE');
        table.string('images');
        table.integer("status").defaultTo(0);
        table.string('url').notNullable();
        table.timestamps(true, true);  // Raccourci pour ajouter les champs created_at et updated_at
      })

  
    
    );
};
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("customerimages")
    .dropTableIfExists("paymentcards")
    .dropTableIfExists("subscriptions")
    .dropTableIfExists("profilesId")
    .dropTableIfExists("customers")
};