package com.softsim.lcsoftsim.ui.adapter


import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.softsim.lcsoftsim.R
import com.softsim.lcsoftsim.data.model.Category
import  com.softsim.lcsoftsim.api.Urls.API_URL
import com.bumptech.glide.Glide
import com.google.android.material.imageview.ShapeableImageView

class CategoryAdapter(
    private val categoryList: List<Category>,
    private val context: Context
) : RecyclerView.Adapter<CategoryAdapter.ViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.single_categories, parent, false)
        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val category = categoryList[position]
        holder.bind(category)
    }

    override fun getItemCount(): Int = categoryList.size

    inner class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        private val categoryName: TextView = itemView.findViewById(R.id.categoryName)
        private val categoryDescription: TextView = itemView.findViewById(R.id.categoryDescription)
        private val categoryImage: ShapeableImageView = itemView.findViewById(R.id.img_best_deal)

        fun bind(category: Category) {
            categoryName.text = category.name
            categoryDescription.text = category.description

            // Load the image using Glide
            Glide.with(context)
                .load(API_URL+"categories/"+category.images	) // Image URL
                .placeholder(R.drawable.caegories) // Optional placeholder image
                .error(R.drawable.caegories) // Optional error image
                .into(categoryImage)
        }
    }
}