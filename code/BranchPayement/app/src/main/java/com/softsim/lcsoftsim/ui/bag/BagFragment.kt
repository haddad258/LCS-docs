package com.softsim.lcsoftsim.ui.bag

import android.content.Context
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.LinearLayout
import android.widget.TextView
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.airbnb.lottie.LottieAnimationView
import com.softsim.lcsoftsim.R
import com.softsim.lcsoftsim.data.local.cart.CartOrders
import com.softsim.lcsoftsim.data.model.CartOrder
import com.softsim.lcsoftsim.ui.adapter.CartAdapter
import com.softsim.lcsoftsim.api.ApiConfigToken
import com.softsim.lcsoftsim.ui.adapter.CartItemClickAdapter
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class BagFragment : Fragment(), CartItemClickAdapter {

    private lateinit var cartRecView: RecyclerView
    private lateinit var cartAdapter: CartAdapter
    private lateinit var animationView: LottieAnimationView
    private lateinit var totalPriceBagFrag: TextView
    private lateinit var cartOrders: CartOrders
    private lateinit var bottomCartLayout: LinearLayout
    private lateinit var emptyBagMsgLayout: LinearLayout
    private var sum: Int = 0

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(R.layout.fragment_bag, container, false)

        // Initialize Views
        cartRecView = view.findViewById(R.id.cartRecView)
        animationView = view.findViewById(R.id.animationViewCartPage)
        totalPriceBagFrag = view.findViewById(R.id.totalPriceBagFrag)
        bottomCartLayout = view.findViewById(R.id.bottomCartLayout)
        emptyBagMsgLayout = view.findViewById(R.id.emptyBagMsgLayout)

        // Assign the Button correctly
        val checkOutButton = view.findViewById<Button>(R.id.checkOut_BagPage)

        val mybagText: TextView = view.findViewById(R.id.MybagText)

        cartOrders = CartOrders(requireContext())

        // Setup RecyclerView
        cartRecView.layoutManager = LinearLayoutManager(context)
        cartAdapter = CartAdapter(activity as Context, this)
        cartRecView.adapter = cartAdapter

        // Fetch Cart Orders and Setup Button
        fetchCartOrders()

        // Set OnClickListener for Checkout Button
        checkOutButton.setOnClickListener {
            onCheckOutButtonClick()
        }

        return view
    }

    private fun onCheckOutButtonClick() {
        CoroutineScope(Dispatchers.IO).launch {
            try {
                val cartOrderList = cartOrders.getAllCartOrders()  // Fetch data from SQLite

                if (cartOrderList.isNotEmpty()) {
                    val response = ApiConfigToken.apiService.createOrders(cartOrderList)
                    withContext(Dispatchers.Main) {
                        if (response.isSuccessful) {
                            Toast.makeText(context, "Order Created", Toast.LENGTH_SHORT).show()
                            cartOrders.emptyCartOrder()
                            fetchCartOrders() // Update UI after clearing cart
                        } else {
                            Log.e("APIonCheckOutButtonClick", "Failed to post orders: ${response.errorBody()?.string()}")
                            Toast.makeText(context, "Failed to post orders: ${response.errorBody()?.string()}", Toast.LENGTH_SHORT).show()
                        }
                    }
                } else {
                    Log.d("APIonCheckOutButtonClick", "No orders to post")
                }
            } catch (e: Exception) {
                Log.e("APIonCheckOutButtonClick", "Error posting orders", e)
            }
        }
    }

    private fun fetchCartOrders() {
        CoroutineScope(Dispatchers.IO).launch {
            val cartOrderList: List<CartOrder> = cartOrders.getAllCartOrders()
            withContext(Dispatchers.Main) {
                if (cartOrderList.isNotEmpty()) {
                    cartAdapter.setCartItems(cartOrderList)
                    updateTotalPrice(cartOrderList)
                    showCartView()
                } else {
                    showEmptyView()
                }
            }
        }
    }

    private fun showCartView() {
        cartRecView.visibility = View.VISIBLE
        animationView.visibility = View.GONE
        totalPriceBagFrag.visibility = View.VISIBLE
        bottomCartLayout.visibility = View.VISIBLE
        emptyBagMsgLayout.visibility = View.GONE
    }

    private fun showEmptyView() {
        cartRecView.visibility = View.GONE
        animationView.visibility = View.VISIBLE
        totalPriceBagFrag.visibility = View.GONE
        bottomCartLayout.visibility = View.GONE
        emptyBagMsgLayout.visibility = View.VISIBLE
    }

    private fun updateTotalPrice(cartOrderList: List<CartOrder>) {
        sum = cartOrderList.sumOf { it.totalPrice.toInt() }
        totalPriceBagFrag.text = "Total: $$sum"
    }

    override fun onItemDeleteClick(cartOrder: CartOrder) {
        CoroutineScope(Dispatchers.IO).launch {
            val isDeleted = cartOrders.deleteCartOrderById(cartOrder.productId)
            withContext(Dispatchers.Main) {
                if (isDeleted) {
                    Toast.makeText(context, "Deleted ${cartOrder.productName}", Toast.LENGTH_SHORT).show()
                    fetchCartOrders()
                } else {
                    Toast.makeText(context, "Failed to delete ${cartOrder.productName}", Toast.LENGTH_SHORT).show()
                }
            }
        }
    }

    override fun onItemUpdateClick(product: CartOrder) {
        Toast.makeText(context, "Updated In Bag", Toast.LENGTH_SHORT).show()
        fetchCartOrders()
    }
}
