package com.softsim.lcsoftsim.data.model

import java.util.Date

// Generic API response model for card entities
data class ApiResponseCardEntity<T>(
    val status: Int,
    val message: String?,
    val data: List<T> // List of items of generic type T
)

// Card entity model for storing payment card details
data class CardEntity(
    val id: String,             // Unique identifier for the card
    val cardholder_name: String,         // Card Holder Name
    val card_number_token: String,         // Card Number
    val expiration_date: String,            // Expiry Date
    val billing_address: String,            // CVV Code
    val card_type: String,         // Card Brand (e.g., Visa, MasterCard)
    val additionalInfo: String, // Additional information (e.g., "test")
    val provider: String = "issuer", // Card provider or issuer
    val issueDate: Date?,       // Date the card was issued
    val created_at: String,     // Created at timestamp
    val updated_at: String      // Updated at timestamp
)


