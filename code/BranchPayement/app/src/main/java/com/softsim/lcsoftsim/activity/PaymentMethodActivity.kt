package com.softsim.lcsoftsim.activity

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Button
import android.widget.ImageView
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.google.android.material.bottomsheet.BottomSheetDialog
import com.softsim.lcsoftsim.R
import com.softsim.lcsoftsim.api.ApiConfig
import com.softsim.lcsoftsim.api.ApiConfigToken
import com.softsim.lcsoftsim.data.model.CardEntity
import com.softsim.lcsoftsim.ui.adapter.CarDItemClickAdapter
import com.softsim.lcsoftsim.ui.adapter.CardAdapter
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class PaymentMethodActivity : AppCompatActivity(), CarDItemClickAdapter {

    private lateinit var cardRec: RecyclerView
    private lateinit var cardAdapter: CardAdapter
    private lateinit var bottomSheetDialog: BottomSheetDialog
    private lateinit var addCardButton: Button

    private val items = arrayListOf<CardEntity>()

    // Activity result launcher for AddPaymentCardActivity
    private val addCardLauncher = registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { result ->
        if (result.resultCode == RESULT_OK) {
            refreshPage() // Refresh the page when a new card is successfully added
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_payment_method)

        // Initialize views
        cardRec = findViewById(R.id.cardRecView_paymentMethodPage)
        val backIv_PaymentMethodsPage = findViewById<ImageView>(R.id.backIv_PaymentMethodsPage)
        addCardButton = findViewById(R.id.addCard_PaymentMethodPage)

        // Set up RecyclerView
        cardRec.layoutManager = LinearLayoutManager(this)
        cardAdapter = CardAdapter(this, this)
        cardRec.adapter = cardAdapter

        // Back button listener
        backIv_PaymentMethodsPage.setOnClickListener {
            onBackPressed()
        }

        // Add card button listener using the launcher
        addCardButton.setOnClickListener {
            val intent = Intent(this, AddPaymentCardActivity::class.java)
            addCardLauncher.launch(intent)
        }

        // Initialize BottomSheetDialog
        bottomSheetDialog = BottomSheetDialog(this, R.style.BottomSheetDialogTheme)

        // Fetch payment methods from the API
        fetchPaymentMethods()
    }

    private fun fetchPaymentMethods() {
        CoroutineScope(Dispatchers.IO).launch {
            try {
                val response = ApiConfigToken.apiService.getPaymentMethods()
                Log.d("response", response.toString())

                if (response.isSuccessful) {
                    val apiResponse = response.body()
                    Log.d("API_SUCCESS", "Fetched payment methods: $apiResponse")

                    if (apiResponse != null && apiResponse.status == 200) {
                        val listPayments = apiResponse.data ?: emptyList()
                        Log.d("API_SUCCESS", "Fetched payment methods: $listPayments")

                        launch(Dispatchers.Main) {
                            items.clear()
                            items.addAll(listPayments)
                            cardAdapter.updateList(items)
                        }
                    } else {
                        Log.e("API_ERROR", "Error in API response: ${apiResponse?.message}")
                    }
                } else {
                    Log.e("API_ERROR", "Error fetching payment methods: ${response.errorBody()}")
                }
            } catch (e: Exception) {
                Log.e("API_ERROR", "Exception fetching payment methods: $e")
            }
        }
    }

    private fun refreshPage() {
        // Refresh the payment methods by calling fetchPaymentMethods again
        fetchPaymentMethods()
    }

    override fun onItemDeleteClick(cardEntity: CardEntity) {
        items.remove(cardEntity)
        cardAdapter.updateList(items)
        Toast.makeText(this, "Card Removed", Toast.LENGTH_SHORT).show()
    }

    override fun onItemUpdateClick(cardEntity: CardEntity) {
        // Handle the item update here if needed
    }
}
