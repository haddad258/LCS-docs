package com.softsim.lcsoftsim.api

import okhttp3.Interceptor
import okhttp3.Response
import com.softsim.lcsoftsim.utils.SharedPreferencesManager

class AuthInterceptor(private val context: android.content.Context) : Interceptor {
    override fun intercept(chain: Interceptor.Chain): Response {
        val request = chain.request()
        val token = SharedPreferencesManager.getToken()

        val newRequest = if (token != null) {
            request.newBuilder()
                .addHeader("Authorization", "Bearer $token")
                .build()
        } else {
            request
        }

        return chain.proceed(newRequest)
    }
}
