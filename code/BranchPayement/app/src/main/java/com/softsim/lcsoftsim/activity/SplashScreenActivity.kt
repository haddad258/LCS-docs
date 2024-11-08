package com.softsim.lcsoftsim.activity
import android.annotation.SuppressLint
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.Handler
import androidx.appcompat.app.AppCompatDelegate
import  com.softsim.lcsoftsim.R
import com.softsim.lcsoftsim.utils.SharedPreferencesManager

@SuppressLint("CustomSplashScreen")
class SplashScreenActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_splash_screen)
        SharedPreferencesManager.init(this)
        AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_FOLLOW_SYSTEM)
        Handler().postDelayed({
            NavigateTo()
        }, 3000)
    }
    private fun NavigateTo() {
        val intent = Intent(this, LoginActivity::class.java)
        startActivity(intent)

    }
}