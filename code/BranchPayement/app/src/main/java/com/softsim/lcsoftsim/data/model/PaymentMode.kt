package com.softsim.lcsoftsim.data.model

data class PaymentMode(
    val id: String,
    val name: String,
    val description: String,
    val secretId: String,
    val userId: String,
    val accountId: String,
    val tokenId: String,
    val authO: String,
    val attributionId: String,
    val requestId: String,
    val status: Int,
    val createdAt: String, // You might want to parse this as a Date instead of a String
    val updatedAt: String  // You might want to parse this as a Date instead of a String
)