package com.softsim.lcsoftsim.ui.adapter



import android.content.Context
import android.content.Intent
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.*
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.google.android.material.imageview.ShapeableImageView
import com.softsim.lcsoftsim.data.model.PlanPack

import com.softsim.lcsoftsim.R
import com.softsim.lcsoftsim.activity.PlanPackDetailsActivity
import com.softsim.lcsoftsim.api.Urls.API_URL

class SalesOffertAdapter(private val productList: ArrayList<PlanPack>, context: Context): RecyclerView.Adapter<SalesOffertAdapter.ViewHolder>()  {

    val ctx: Context = context

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {

        val productView = LayoutInflater.from(parent.context).inflate(R.layout.single_offerts,parent,false)
        return ViewHolder(productView)
    }


    override fun onBindViewHolder(holder: ViewHolder, position: Int) {

        val product: PlanPack = productList[position]
        holder.productBrandName_singleProduct.text = product.name
        holder.productName_singleProduct.text = product.description
        holder.productPrice_singleProduct.text = "$"+product.description


        //  holder.productRating_singleProduct.rating = 10



        if(product.id == "true"){
            holder.discountTv_singleProduct.text = product.name
            holder.discount_singleProduct.visibility = View.VISIBLE
        }

        if(product.id == "false"){

            holder.discount_singleProduct.visibility = View.VISIBLE
            holder.discountTv_singleProduct.text = "New"

        }
        Glide.with(ctx)
            .load(API_URL +"articles/"+product.images	) // Image URL
            .placeholder(R.drawable.img) // Optional placeholder image
            .error(R.drawable.img) // Optional error image
            .into(holder.productImage_singleProduct)


        holder.itemView.setOnClickListener {
            goDetailsPage(product.id)
        }

    }

    override fun getItemCount(): Int {
        return productList.size
    }

    class ViewHolder(itemView: View):RecyclerView.ViewHolder(itemView){

        val productImage_singleProduct:ImageView = itemView.findViewById(R.id.productImage_singleProduct)
        val productAddToFav_singleProduct:ImageView = itemView.findViewById(R.id.productAddToFav_singleProduct)
        val productRating_singleProduct:RatingBar = itemView.findViewById(R.id.productRating_singleProduct)
        val productBrandName_singleProduct:TextView = itemView.findViewById(R.id.productBrandName_singleProduct)
        val discountTv_singleProduct:TextView = itemView.findViewById(R.id.discountTv_singleProduct)
        val productName_singleProduct:TextView = itemView.findViewById(R.id.productName_singleProduct)
        val productPrice_singleProduct:TextView = itemView.findViewById(R.id.productPrice_singleProduct)
        val discount_singleProduct = itemView.findViewById<LinearLayout>(R.id.discount_singleProduct)


    }


    private fun goDetailsPage(productId: String) {
        Log.d("ProductDetails", productId)
        val intent = Intent(ctx, PlanPackDetailsActivity::class.java).apply {
            putExtra("ProductIndex", productId)
            putExtra("ProductFrom", "New")
        }
        ctx.startActivity(intent)
    }

}