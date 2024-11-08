package com.softsim.lcsoftsim.data.model
import java.util.*


data class ApiResponseOrderId<T>(
    val status: Int,
    val message: String?,
    val data: List<T> // Changed from T to List<T>
)
data class Orders(
    val id: String, // Unique identifier for the order
    val paymentStatusId: String, // Foreign key reference to statusorders table
    val customerId: String, // Foreign key reference to customers table
    val order_number	: String, // Unique order number
    val price: String, // Unit price of the order
    val quantity: Int = 1, // Quantity of the order
    val unitPrice: String = "$", // Display format for unit price
    val name: String?, // Name of the order
    val description: String?, // Description of the order
    val location: String?, // Location associated with the order
    val provider: String = "owner", // Provider of the order
    val expirationDate: Date?, // Expiration date (if applicable)
    val note: String?, // Additional notes
    val trackingNumber: String?, // Shipping tracking number
    val created_at	: String, // Created at timestamp
    val updated_at	: String // Updated at timestamp
)