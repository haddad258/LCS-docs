// ProfilesM.kt
package com.softsim.lcsoftsim.data.local.profile



data class ApiResponseProfilesM<T>(
    val status: Int,
    val message: String?,
    val data: List<T> // Changed from T to List<T>
)
data class ProfilesM(
    val id:  String,
    val lpa_esim: String,
    val iccid: String,
    val imsi: String,
    val mnc: String,
    val mcc: String,
    val number: String,
    val brand: String,
    val ki: String,
    val norm_ref: String,
    val type: String,
    val country_code: String,
    val operator: String,
    val description: String,
    val status: Int,
)
