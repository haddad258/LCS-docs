package com.softsim.lcsoftsim.data.model

data class RegisterCardPayment(
    val cardholder_name: String,
    val card_number_token: String,  // Tokenized card number
    val expiration_date: String,    // Format MM/YY or YYYY-MM
    val card_type: String           // Card type, e.g., Visa, MasterCard
)