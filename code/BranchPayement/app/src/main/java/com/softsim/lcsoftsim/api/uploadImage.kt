package com.softsim.lcsoftsim.api

import android.content.Context
import okhttp3.*
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.logging.HttpLoggingInterceptor
import java.io.File

fun uploadImage(context: Context, file: File, customerId: String, token: String, serverUrl: String): Response? {
    // Initialize the AuthInterceptor
    val authInterceptor = AuthInterceptor(context)

    // Initialize OkHttpClient with the AuthInterceptor
    val client = OkHttpClient.Builder()
        .addInterceptor(authInterceptor)
        .addInterceptor(HttpLoggingInterceptor().apply {
            level = HttpLoggingInterceptor.Level.BODY
        })
        .build()

    // Build the request body
    val requestBody = MultipartBody.Builder()
        .setType(MultipartBody.FORM)
        .addFormDataPart("files", file.name, RequestBody.create("image/jpeg".toMediaTypeOrNull(), file))
        .addFormDataPart("entity", "customers")
        .addFormDataPart("id", customerId)
        .build()

    // Build the request
    val request = Request.Builder()
        .url(serverUrl)
        .post(requestBody)
        .build()

    // Execute the request
    return try {
        client.newCall(request).execute()
    } catch (e: Exception) {
        e.printStackTrace()
        null
    }
}
