package com.softsim.lcsoftsim.utils


import android.content.Context
import android.content.SharedPreferences

object SharedPreferencesManager {

    private const val PREF_NAME = "user_prefs"
    private const val KEY_TOKEN = "token"
    private var context: Context? = null

    fun init(context: Context) {
        SharedPreferencesManager.context = context
    }

    private fun getSharedPreferences(): SharedPreferences {
        return context?.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE)
            ?: throw IllegalStateException("Context not initialized")
    }

    fun saveToken(token: String) {
        val prefs = getSharedPreferences()
        with(prefs.edit()) {
            putString(KEY_TOKEN, token)
            apply()
        }
    }

    fun getToken(): String? {
        val prefs = getSharedPreferences()
        return prefs.getString(KEY_TOKEN, null)
    }

    fun clearToken() {
        val prefs = getSharedPreferences()
        with(prefs.edit()) {
            remove(KEY_TOKEN)
            apply()
        }
    }

    fun getContext(): Context {
        return context ?: throw IllegalStateException("Context not initialized")
    }
}
