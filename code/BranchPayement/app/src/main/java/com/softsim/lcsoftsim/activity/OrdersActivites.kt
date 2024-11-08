package com.softsim.lcsoftsim.activity

import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.softsim.lcsoftsim.R
import com.softsim.lcsoftsim.api.ApiConfigToken
import com.softsim.lcsoftsim.data.model.Orders
import com.softsim.lcsoftsim.ui.adapter.OrderAdapter
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import retrofit2.Response

class OrdersActivity : AppCompatActivity() {
    private lateinit var recyclerView: RecyclerView
    private lateinit var orderAdapter: OrderAdapter
    private val ordersList = mutableListOf<Orders>()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.orders) // Ensure the layout file exists and is named correctly

        // Initialize RecyclerView and Adapter
        recyclerView = findViewById(R.id.recycler_view_orders)
        recyclerView.layoutManager = LinearLayoutManager(this)
        orderAdapter = OrderAdapter(ordersList)
        recyclerView.adapter = orderAdapter

        // Fetch data
        fetchOrders()
    }

    private fun fetchOrders() {
        CoroutineScope(Dispatchers.IO).launch {
            // Launch a coroutine in the IO context for network calls
            try {
                val response = ApiConfigToken.apiService.getOrders()
                if (response.isSuccessful) {
                    val apiResponse = response.body()
                    if (apiResponse != null && apiResponse.status == 200) {
                        val listOrders = apiResponse.data
                        Log.d("API_SUCCESS", "Fetched orders: $listOrders")
                        // Switch to the Main thread to update the UI
                        launch(Dispatchers.Main) {
                            ordersList.clear() // Clear the old list before adding new data
                            ordersList.addAll(listOrders) // Add new orders to the list
                            orderAdapter.notifyDataSetChanged() // Notify the adapter about data changes
                        }
                    } else {
                        Log.e("API_ERROR", "Error in API response: ${apiResponse?.message}")
                    }
                } else {
                    Log.e("API_ERROR", "Error fetching orders: ${response.errorBody()}")
                }
            } catch (e: Exception) {
                Log.e("API_ERROR", "Exception fetching orders: $e")
            }
        }
    }
}
