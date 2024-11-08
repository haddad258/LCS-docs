package com.softsim.lcsoftsim.data.local.cart

import android.content.ContentValues
import android.content.Context
import android.database.Cursor
import android.database.sqlite.SQLiteDatabase
import android.database.sqlite.SQLiteOpenHelper
import com.softsim.lcsoftsim.data.model.CartOrder

class CartOrders(context: Context) {

    private val dbHelper = CartDbHelper(context)

    // Add a cart order
    fun addCartOrder(
        productId: String,
        productName: String,
        productPrice: Double,
        qty: Int,
        totalPrice: Double,
        providersId: String,
        barcode: String,
        description: String,
        images: String
    ): Boolean {
        val contentValues = ContentValues().apply {
            put("productId", productId)
            put("productName", productName)
            put("productPrice", productPrice)
            put("totalPrice", totalPrice)
            put("qty", qty)
            put("createdAt", System.currentTimeMillis().toString())
            put("providersId", providersId)
            put("barcode", barcode)
            put("description", description)
            put("images", images)
        }
        dbHelper.writableDatabase.use { db ->
            val result = db.insert("CartOrders", null, contentValues)
            return result != -1L
        }
    }

    // Retrieve all cart orders
    fun getAllCartOrders(): List<CartOrder> {
        val cartOrders = mutableListOf<CartOrder>()
        dbHelper.readableDatabase.use { db ->
            val cursor: Cursor = db.rawQuery("SELECT * FROM CartOrders", null)
            cursor.use {
                if (it.moveToFirst()) {
                    do {
                        val cartOrder = CartOrder(
                            id = it.getInt(it.getColumnIndexOrThrow("id")),
                            productId = it.getString(it.getColumnIndexOrThrow("productId")),
                            productName = it.getString(it.getColumnIndexOrThrow("productName")),
                            productPrice = it.getDouble(it.getColumnIndexOrThrow("productPrice")),
                            totalPrice = it.getDouble(it.getColumnIndexOrThrow("totalPrice")),
                            qty = it.getInt(it.getColumnIndexOrThrow("qty")),
                            createdAt = it.getString(it.getColumnIndexOrThrow("createdAt")),
                            providersId = it.getString(it.getColumnIndexOrThrow("providersId")),
                            barcode = it.getString(it.getColumnIndexOrThrow("barcode")),
                            description = it.getString(it.getColumnIndexOrThrow("description")),
                            images = it.getString(it.getColumnIndexOrThrow("images"))
                        )
                        cartOrders.add(cartOrder)
                    } while (it.moveToNext())
                }
            }
        }
        return cartOrders
    }

    // Delete a cart order
    fun deleteCartOrderById(productId: String): Boolean {
        dbHelper.writableDatabase.use { db ->
            val result = db.delete("CartOrders", "productId = ?", arrayOf(productId))
            return result > 0
        }
    }

    // Empty the cart
    fun emptyCartOrder(): Boolean {
        dbHelper.writableDatabase.use { db ->
            val result = db.delete("CartOrders", null, null)
            return result > 0
        }
    }

    // Check if the cart contains any orders
    fun hasCartOrders(): Boolean {
        dbHelper.readableDatabase.use { db ->
            val cursor = db.rawQuery("SELECT * FROM CartOrders", null)
            cursor.use {
                return it.count > 0
            }
        }
    }

    // Database helper class
    private class CartDbHelper(context: Context) : SQLiteOpenHelper(
        context, "CartDB", null, 1
    ) {
        override fun onCreate(db: SQLiteDatabase) {
            val createTableQuery = """
                CREATE TABLE IF NOT EXISTS CartOrders (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    productId TEXT,
                    productName TEXT,
                    productPrice REAL,
                    totalPrice REAL,
                    qty INTEGER,
                    createdAt TEXT,
                    providersId TEXT,
                    barcode TEXT,
                    description TEXT,
                    images TEXT default "im"
                )
            """.trimIndent()
            db.execSQL(createTableQuery)
        }

        override fun onUpgrade(db: SQLiteDatabase, oldVersion: Int, newVersion: Int) {
            db.execSQL("DROP TABLE IF EXISTS CartOrders")
            onCreate(db)
        }
    }
}
