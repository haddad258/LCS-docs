package com.softsim.lcsoftsim.data.model

data class UploadResponse(
    val success: Boolean,
    val message: String,
    val data: UploadData
)

data class UploadData(
    val filename: String,
    val url: String
)