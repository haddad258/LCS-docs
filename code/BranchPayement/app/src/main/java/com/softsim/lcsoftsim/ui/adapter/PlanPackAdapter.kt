package com.softsim.lcsoftsim.ui.adapter

import android.content.Context
import android.content.Intent
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.*
import androidx.recyclerview.widget.RecyclerView
import com.google.android.material.imageview.ShapeableImageView
import com.softsim.lcsoftsim.R
import com.softsim.lcsoftsim.data.model.PlanPack
import com.softsim.lcsoftsim.activity.PlanPackDetailsActivity
import com.bumptech.glide.Glide
import com.softsim.lcsoftsim.api.Urls.API_URL
class PlanPackAdapter(
    private val productList: List<PlanPack>,
    private val context: Context
) : RecyclerView.Adapter<PlanPackAdapter.ViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.single_planpack, parent, false)
        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val product = productList[position]
        holder.bind(product)
    }

    override fun getItemCount(): Int = productList.size

    inner class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {

        private val productBrandName: TextView = itemView.findViewById(R.id.productBrandName_singleProduct)
        private val discountTv: TextView = itemView.findViewById(R.id.discountTv_singleProduct)
        private val productName: TextView = itemView.findViewById(R.id.productName_singleProduct)
        private val productPrice: TextView = itemView.findViewById(R.id.productPrice_singleProduct)
        private val discountLayout: LinearLayout = itemView.findViewById(R.id.discount_singleProduct)
        private val productImage: ShapeableImageView = itemView.findViewById(R.id.productImage_singleProductV)

        fun bind(product: PlanPack) {
            productBrandName.text = product.images // Adjust according to actual data
            productName.text = product.description // Adjust according to actual data
            productPrice.text = product.name // Adjust according to actual data

            discountLayout.visibility = if (product.id == "true" || product.id == "false") {
                discountTv.text = if (product.id == "true") product.name else "New"
                View.VISIBLE
            } else {
                View.GONE
            }

            Glide.with(context)
                .load(API_URL + "articles/" + product.images) // Image URL
                .placeholder(R.drawable.img) // Optional placeholder image
                .error(R.drawable.img) // Optional error image
                .into(productImage)

            itemView.setOnClickListener {
                goToDetailsPage(product.id)
            }
        }

        private fun goToDetailsPage(productId: String) {
            Log.d("ProductDetails", productId)
            val intent = Intent(context, PlanPackDetailsActivity::class.java).apply {
                putExtra("ProductIndex", productId)
                putExtra("ProductFrom", "New")
            }
            context.startActivity(intent)
        }
    }
}
