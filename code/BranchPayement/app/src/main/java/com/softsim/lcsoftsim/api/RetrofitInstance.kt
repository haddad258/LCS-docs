package com.softsim.lcsoftsim.api
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object ApiConfig {

    val apiService: ApiService by lazy {
        Retrofit.Builder()
            //.baseUrl("https://api.dev.lcs-system.com")
            //.baseUrl("https://api.rec.lcs-system.com")
            .baseUrl("http://192.168.1.28:8009")
            .addConverterFactory(GsonConverterFactory.create())  // Parse the json data retroit got
            .build()
            .create(ApiService::class.java)
    }
}