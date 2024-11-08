package com.softsim.lcsoftsim.activity

import android.os.Bundle
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.appcompat.app.AppCompatActivity
import com.softsim.lcsoftsim.R

class PayPalInterface : AppCompatActivity() {
    private lateinit var webView: WebView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.payment_paypal)

        webView = findViewById(R.id.webView)

        // Configure WebView settings
        webView.webViewClient = WebViewClient()
        webView.settings.apply {
            javaScriptEnabled = true
            setSupportZoom(true)
            cacheMode = WebSettings.LOAD_NO_CACHE  // Optional: prevent caching for dynamic content
        }

        // Load URL
        webView.loadUrl("http://192.168.1.28:4001")
    }

    // Handle back button navigation in WebView
    override fun onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack()
        } else {
            super.onBackPressed()
        }
    }
}
