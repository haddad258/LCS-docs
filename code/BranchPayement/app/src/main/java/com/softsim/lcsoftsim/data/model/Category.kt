package com.softsim.lcsoftsim.data.model



data class ApiResponseForm<T>(
    val message: String,
    val status: Int,
    val data: List<T>  // The actual data (categories or sales packs)
)

data class Category(
    val id: String,
    val name: String,
    val description: String,
    val images: String?,
    val created_at: String,
    val updated_at: String
)
data class ApiResponseFormId<T>(
    val message: String,
    val status: Int,
    val data: T  // The actual data (categories or sales packs)
)


data class PlanPack(
    val id: String,
    val categorieId: String?,
    val itemkitId: String?,
    val itemId: String?,
    val brandId: String?,
    val providersId: String,
    val name: String,
    val barcode: String,
    val loyalty: String?,
    val description: String,
    val price: Double = 0.0,
    val images: String,
)
