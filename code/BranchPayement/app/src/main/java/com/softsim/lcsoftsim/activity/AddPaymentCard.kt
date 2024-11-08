package com.softsim.lcsoftsim.activity

import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.softsim.lcsoftsim.R
import com.softsim.lcsoftsim.api.ApiConfig
import com.softsim.lcsoftsim.api.ApiConfigToken
import com.softsim.lcsoftsim.data.model.ApiResponseCardEntity
import com.softsim.lcsoftsim.data.model.CardEntity
import com.softsim.lcsoftsim.data.model.RegisterCardPayment
import kotlinx.coroutines.launch
import retrofit2.Response

class AddPaymentCardActivity : AppCompatActivity() {

    private lateinit var editTextCardHolderName: EditText
    private lateinit var editTextCardNumber: EditText
    private lateinit var editTextExpiryDate: EditText
    private lateinit var editTextCVV: EditText
    private lateinit var buttonAddCard: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_add_payment_card)

        // Initialize views
        editTextCardHolderName = findViewById(R.id.editTextCardHolderName)
        editTextCardNumber = findViewById(R.id.editTextCardNumber)
        editTextExpiryDate = findViewById(R.id.editTextExpiryDate)
        editTextCVV = findViewById(R.id.editTextCVV)
        buttonAddCard = findViewById(R.id.buttonAddCard)

        // Set click listener to trigger API call
        buttonAddCard.setOnClickListener {
            val cardHolderName = editTextCardHolderName.text.toString()
            val cardNumber = editTextCardNumber.text.toString()
            val expiryDate = editTextExpiryDate.text.toString()
            val cvv = editTextCVV.text.toString()

            // Assuming you have a tokenization function for security
            val cardNumberToken = tokenizeCardNumber(cardNumber)

            // Define card type (can be hardcoded or determined based on number)
            val cardType = determineCardType(cardNumber)

            // Create the request object
            val registerCardPaymentRequest = RegisterCardPayment(
                cardholder_name = cardHolderName,
                card_number_token = cardNumberToken,
                expiration_date = expiryDate,
                card_type = cardType
            )

            registerCardPayment(registerCardPaymentRequest)
        }
    }
    fun tokenizeCardNumber(cardNumber: String): String {
        // Tokenize and return the card number securely
        return "TOKENIZED_$cardNumber"  // Replace with actual tokenization logic
    }

    // Determine card type based on card number prefix
    fun determineCardType(cardNumber: String): String {
        return when {
            cardNumber.startsWith("4") -> "Visa"
            cardNumber.startsWith("5") -> "MasterCard"
            // Add more conditions as needed
            else -> "Unknown"
        }
    }
    private fun registerCardPayment(request: RegisterCardPayment) {
        lifecycleScope.launch {
            try {
                val response = ApiConfigToken.apiService.registerCardPayment(request)
                handleCardPaymentResponse(response)
                setResult(RESULT_OK)  // Set result code to indicate success
                finish()
            } catch (e: Exception) {
                showToast("Error: ${e.message}")
            }
        }
    }

    private fun handleCardPaymentResponse(response: Response<ApiResponseCardEntity<CardEntity>>) {
        if (response.isSuccessful && response.body()?.status == 200) {
            navigateToLogin()
            showToast("Card registered successfully")
        } else {
            showToast("Registration failed: ${response.body()?.message ?: "Unknown error"}")
        }
    }

    private fun showToast(message: String) {
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show()
    }

    private fun navigateToLogin() {
        // Navigate to the login activity
    }
}
