package com.softsim.lcsoftsim.activity

import android.os.Bundle
import android.util.Log
import android.widget.AdapterView
import android.widget.ArrayAdapter
import android.widget.Button
import android.widget.CheckBox
import android.widget.Spinner
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.softsim.lcsoftsim.R
import com.softsim.lcsoftsim.api.ApiConfig
import com.softsim.lcsoftsim.api.ApiConfigToken
import com.softsim.lcsoftsim.data.model.CardEntity
import com.softsim.lcsoftsim.data.model.CreateSubscriptions
import com.softsim.lcsoftsim.data.model.PaymentMode
import com.softsim.lcsoftsim.data.model.Subscriptions
import com.softsim.lcsoftsim.ui.adapter.PaymentModesAdapter
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class PaymentModesActivity : AppCompatActivity() {

    private lateinit var paymentModesSpinner: Spinner // Spinner for payment modes
    private lateinit var paymentModesRecView: RecyclerView
    private lateinit var paymentModeAdapter: PaymentModesAdapter
    private lateinit var newSubscriptionCheckbox: CheckBox
    private lateinit var confirmPaymentButton: Button
    private val items = arrayListOf<CardEntity>()

    private var selectedPaymentModeId: String? = null // Variable to store selected payment mode ID
    private var selectedCardId: String? = null // Variable to store selected card ID

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_payment_modes)

        confirmPaymentButton = findViewById(R.id.ConfirmPayment)
        paymentModesSpinner = findViewById(R.id.paymentModesSpinner)
        paymentModesRecView = findViewById(R.id.paymentModesRecView)
        newSubscriptionCheckbox = findViewById(R.id.newSubscriptionCheckbox)

        paymentModesRecView.layoutManager = LinearLayoutManager(this, LinearLayoutManager.HORIZONTAL, false)

        newSubscriptionCheckbox.setOnCheckedChangeListener { _, isChecked ->
            if (isChecked) {
                Log.d("CHECKBOX", "New subscription enabled.")
            } else {
                Log.d("CHECKBOX", "New subscription disabled.")
            }
        }

        // Setup button click listener
        confirmPaymentButton.setOnClickListener {
            if (selectedPaymentModeId != null && selectedCardId != null) {
                // Create subscription data with selectedPaymentModeId and selectedCardId
                val newSubscription = CreateSubscriptions(
                    id = "UUID.randomUUID().toString()",
                    customerId = "customer123", // Replace with actual customer ID
                    mode=selectedPaymentModeId.toString(),
                    card=selectedCardId,
                    isNewSubscription = newSubscriptionCheckbox.isChecked // Include checkbox state
                )

                // Here you can also include the selectedPaymentModeId and selectedCardId in your subscription data if necessary

                // Call the function to post subscription
                postSubscription(newSubscription)
            } else {
                showToast("Please select a payment mode and a card.")
            }
        }

        fetchPaymentModes()
        fetchPaymentMethods()
        fetchSubscriptions()
    }

    private fun fetchPaymentModes() {
        CoroutineScope(Dispatchers.IO).launch {
            try {
                val response = ApiConfig.apiService.getPaymentModes() // Replace with your actual API call
                if (response.isSuccessful) {
                    val apiResponse = response.body()
                    if (apiResponse != null && apiResponse.status == 200) {
                        val paymentModes = apiResponse.data
                        Log.d("API_SUCCESS", "Fetched payment modes: $paymentModes")

                        launch(Dispatchers.Main) {
                            setupPaymentModesSpinner(paymentModes) // Set up the Spinner
                        }
                    } else {
                        Log.e("API_ERROR", "Error in API response: ${apiResponse?.message}")
                    }
                } else {
                    Log.e("API_ERROR", "Error fetching payment modes: ${response.errorBody()?.string()}")
                }
            } catch (e: Exception) {
                Log.e("API_ERROR", "Exception fetching payment modes: $e")
            }
        }
    }

    private fun setupPaymentModesSpinner(paymentModes: List<PaymentMode>) {
        // Create a list of Pair where the first element is the payment mode ID and the second is the name
        val paymentModePairs = mutableListOf<Pair<String, String>>() // List of pairs (ID, Name)
        paymentModePairs.add(Pair("0", "Select Payment Mode")) // Placeholder

        // Add payment modes to the list
        paymentModePairs.addAll(paymentModes.map { Pair(it.id, it.name) }) // Add pairs of ID and name

        // Create an ArrayAdapter for the Spinner
        val adapter = ArrayAdapter(this, android.R.layout.simple_spinner_item, paymentModePairs.map { it.second })
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
        paymentModesSpinner.adapter = adapter

        // Set the placeholder as the selected item
        paymentModesSpinner.setSelection(0)

        // Configure the listener for the Spinner
        paymentModesSpinner.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
            override fun onItemSelected(parent: AdapterView<*>, view: android.view.View, position: Int, id: Long) {
                // Prevent actions on selecting the placeholder
                if (position == 0) {
                    Log.d("SELECTED_MODE", "Placeholder selected. No action taken.")
                    return
                }
                // Get the selected payment mode ID
                selectedPaymentModeId = paymentModePairs[position].first // Store selected payment mode ID
                Log.d("SELECTED_MODE", "Selected payment mode ID: $selectedPaymentModeId")
            }

            override fun onNothingSelected(parent: AdapterView<*>) {
                // No selection
            }
        }
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
                            setupPaymentModesRecyclerView(listPayments)
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

    private fun fetchSubscriptions() {
        CoroutineScope(Dispatchers.IO).launch {
            try {
                val response = ApiConfigToken.apiService.getSubscriptions()
                Log.d("response", response.toString())

                if (response.isSuccessful) {
                    val apiResponse = response.body()
                    Log.d("API_SUCCESS", "Fetched subscriptions: $apiResponse")

                    if (apiResponse != null && apiResponse.status == 200) {
                        val listSubscriptions = apiResponse.data ?: emptyList()
                        Log.d("API_SUCCESS", "Fetched subscriptions: $listSubscriptions")

                        launch(Dispatchers.Main) {
                            // Optionally, update UI or display the data as needed
                        }
                    } else {
                        Log.e("API_ERROR", "Error in API response: ${apiResponse?.message}")
                    }
                } else {
                    Log.e("API_ERROR", "Error fetching subscriptions: ${response.errorBody()?.string()}")
                }
            } catch (e: Exception) {
                Log.e("API_ERROR", "Exception fetching subscriptions: $e")
            }
        }
    }

    private fun postSubscription(subscriptionData: CreateSubscriptions) {
        CoroutineScope(Dispatchers.IO).launch {
            try {
                val response = ApiConfigToken.apiService.createSubscription(subscriptionData)
                Log.d("response", response.toString())

                if (response.isSuccessful) {
                    val apiResponse = response.body()
                    Log.d("API_SUCCESS", "Subscription created: $apiResponse")

                    if (apiResponse != null && apiResponse.status == 200) {
                        val createdSubscription = apiResponse.data?.firstOrNull()
                        Log.d("API_SUCCESS", "Created subscription: $createdSubscription")

                        launch(Dispatchers.Main) {
                            // Optionally update UI or notify success
                            Log.d("API_SUCCESS", "Created subscription: $createdSubscription")
                        }
                    } else {
                        Log.e("API_ERROR", "Error in API response: ${apiResponse?.message}")
                    }
                } else {
                    Log.e("API_ERROR", "Error creating subscription: ${response.errorBody()?.string()}")
                }
            } catch (e: Exception) {
                Log.e("API_ERROR", "Exception creating subscription: $e")
            }
        }
    }

    private fun showToast(message: String) {
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show()
    }

    private fun setupPaymentModesRecyclerView(paymentModes: List<CardEntity>) {
        paymentModeAdapter = PaymentModesAdapter(paymentModes, this) { selectedCard ->
            selectedCardId = selectedCard.id // Store selected card ID
            Log.d("SELECTED_CARD", "Selected card: $selectedCardId")
        }
        paymentModesRecView.adapter = paymentModeAdapter
    }
}
