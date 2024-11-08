package com.softsim.lcsoftsim.data.model
import kotlinx.serialization.Serializable

@Serializable
data class OrderDetails(
    val id: Int,
    val name: String,
    val price: Double,
    val totalPrice: Double
)
data class CartOrder(
    val id: Int,
    val productId: String,
    val productName: String,
    val productPrice: Double,
    val totalPrice: Double,
    val qty: Int,
    val createdAt: String,
    val providersId: String,
    val barcode: String,
    val description: String,
    val images: String
)

data class CartOrderResponse(
    val status: Int,
    val message: String,
    val data: String,

)
