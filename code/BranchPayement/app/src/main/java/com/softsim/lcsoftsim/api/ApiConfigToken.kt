package com.softsim.lcsoftsim.api

import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import com.softsim.lcsoftsim.utils.SharedPreferencesManager

object ApiConfigToken {

    private fun getOkHttpClient(context: android.content.Context): OkHttpClient {
        return OkHttpClient.Builder()
            .addInterceptor(AuthInterceptor(context))
            .build()
    }

    val apiService: ApiService by lazy {
        Retrofit.Builder()
            //.baseUrl("https://api.dev.lcs-system.com")
            //.baseUrl("https://api.rec.lcs-system.com")
             .baseUrl("http://192.168.1.28:8009")
            .addConverterFactory(GsonConverterFactory.create())
            .client(getOkHttpClient(SharedPreferencesManager.getContext())) // Add the client with the interceptor
            .build()
            .create(ApiService::class.java)
    }
}
