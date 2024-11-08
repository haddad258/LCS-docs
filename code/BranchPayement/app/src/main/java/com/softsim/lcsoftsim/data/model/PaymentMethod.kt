package com.softsim.lcsoftsim.data.model

data class PaymentMethod(
    val id: String,
    val cardholderName: String,
    val cardNumberToken: String,
    val expirationDate: String,
    val cardType: String
    // Add other fields as necessary
)