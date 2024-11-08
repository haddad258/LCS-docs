package com.softsim.lcsoftsim.activity

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.widget.Button
import android.widget.EditText
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.RatingBar
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.constraintlayout.widget.ConstraintLayout
import androidx.lifecycle.lifecycleScope
import com.bumptech.glide.Glide
import com.google.android.material.bottomsheet.BottomSheetDialog
import com.softsim.lcsoftsim.R
import com.softsim.lcsoftsim.api.ApiConfig
import com.softsim.lcsoftsim.api.Urls.API_URL
import com.softsim.lcsoftsim.data.local.cart.CartOrders
import com.softsim.lcsoftsim.data.model.PlanPack
import com.softsim.lcsoftsim.utils.ToastLcs
import kotlinx.coroutines.launch

class PlanPackDetailsActivity : AppCompatActivity() {
    private lateinit var productFrom: String

    private lateinit var productImage: ImageView
    private lateinit var backIv: ImageView
    private lateinit var productName: TextView
    private lateinit var productPrice: TextView
    private lateinit var productBrand: TextView
    private lateinit var productDescription: TextView
    private lateinit var productRating: RatingBar

    private lateinit var pName: String
    private lateinit var providersId: String
    private lateinit var barcode: String
    private lateinit var description: String
    private lateinit var pImage: String

    private var pPrice: Double = 0.0
    private lateinit var pPid: String
    private var quantity: Int = 1

    private lateinit var cartOrders: CartOrders

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_product_details)

        cartOrders = CartOrders(this)

        // Initialize views
        productImage = findViewById(R.id.productImage_ProductDetailsPage)
        backIv = findViewById(R.id.backIv_ProfileFrag)
        productName = findViewById(R.id.productName)
        productPrice = findViewById(R.id.productPrice_ProductDetailsPage)
        productBrand = findViewById(R.id.productBrand_ProductDetailsPage)
        productDescription = findViewById(R.id.productDes_ProductDetailsPage)
        productRating = findViewById(R.id.productRating_singleProduct)

        // Get product index and fetch details
        val productIndex = intent.getStringExtra("ProductIndex").toString()
        productFrom = intent.getStringExtra("ProductFrom").toString()
        fetchPlanPackDetails(productIndex)

        val addToCartButton: Button = findViewById(R.id.addToCart_ProductDetailsPage)
        addToCartButton.setOnClickListener {
            showAddToCartDialog()
        }
    }

    private fun showAddToCartDialog() {
        val bottomSheetDialog = BottomSheetDialog(this, R.style.BottomSheetDialogTheme)
        val bottomSheetView = LayoutInflater.from(applicationContext).inflate(
            R.layout.fragment_add_to_bag,
            findViewById<ConstraintLayout>(R.id.bottomSheet)
        )

        bottomSheetView.findViewById<LinearLayout>(R.id.minusLayout).setOnClickListener {
            if (quantity > 1) {
                quantity--
                bottomSheetView.findViewById<EditText>(R.id.quantityEtBottom).setText(quantity.toString())
            }
        }

        bottomSheetView.findViewById<LinearLayout>(R.id.plusLayout).setOnClickListener {
            if (quantity < 10) {
                quantity++
                bottomSheetView.findViewById<EditText>(R.id.quantityEtBottom).setText(quantity.toString())
            }
        }

        bottomSheetView.findViewById<View>(R.id.addToCart_BottomSheet).setOnClickListener {
            val totalPrice = pPrice * quantity
            addProductToBag(quantity, totalPrice)
            bottomSheetDialog.dismiss()
        }

        bottomSheetDialog.setContentView(bottomSheetView)
        bottomSheetDialog.show()
    }

    private fun fetchPlanPackDetails(id: String) {
        lifecycleScope.launch {
            val planPack = getPlanPackById(id)
            if (planPack != null) {
                updateUI(planPack)
            } else {
                ToastLcs("Failed to load PlanPack details")
            }
        }
    }

    private suspend fun getPlanPackById(id: String): PlanPack? {
        val response = ApiConfig.apiService.getPlanPackById(id)
        val apiResponse = response.body()
        return if (apiResponse != null && apiResponse.status == 200) {
            apiResponse.data
        } else {
            null
        }
    }

    private fun updateUI(planPack: PlanPack) {
        productName.text = planPack.name
        productPrice.text = "$${planPack.price}"
        productBrand.text = planPack.brandId // Assuming 'brand' is the actual field
        productDescription.text = planPack.description

        // Safely handle the image loading
        val imageUrl = planPack.images?.let { API_URL + "articles/" + it } ?: R.drawable.img
        Glide.with(this)
            .load(imageUrl)
            .placeholder(R.drawable.img)
            .error(R.drawable.img)
            .into(productImage)

        // Assign values to lateinit properties
        pName = planPack.name
        pPrice = planPack.price
        pPid = planPack.id
        providersId = planPack.providersId ?: "" // Use an empty string if it's null
        barcode = planPack.barcode ?: "" // Use an empty string if it's null
        description = planPack.description ?: "" // Use an empty string if it's null
        pImage = planPack.images ?: "" // Use an empty string or placeholder if it's null
    }

    private fun addProductToBag(quantity: Int, totalPrice: Double) {
        val isAdded = cartOrders.addCartOrder(
            productId = pPid,
            productName = pName,
            productPrice = pPrice,
            qty = quantity,
            totalPrice = totalPrice,
            providersId = providersId, // Use the actual provider ID
            barcode = barcode, // Use the actual barcode
            description = description, // Use the actual description
            images = pImage // Use the actual image URL or path
        )
        if (isAdded) {
            ToastLcs("Product added to cart successfully")
        } else {
            ToastLcs("Failed to add product to cart")
        }
    }

    override fun onBackPressed() {
        super.onBackPressed()
        finish()
    }
}
