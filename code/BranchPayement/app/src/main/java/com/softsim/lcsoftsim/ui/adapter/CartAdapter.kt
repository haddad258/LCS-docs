package com.softsim.lcsoftsim.ui.adapter

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import android.widget.Toast
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.softsim.lcsoftsim.R
import com.softsim.lcsoftsim.api.Urls.API_URL
import com.softsim.lcsoftsim.data.model.CartOrder

class CartAdapter(
    private val context: Context,
    private val itemClickAdapter: CartItemClickAdapter
) : RecyclerView.Adapter<CartAdapter.CartViewHolder>() {

    private var cartItems: List<CartOrder> = emptyList()

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): CartViewHolder {
        val view = LayoutInflater.from(context).inflate(R.layout.cart_item_single, parent, false)
        return CartViewHolder(view)
    }

    override fun onBindViewHolder(holder: CartViewHolder, position: Int) {
        val cartItem = cartItems[position]
        holder.bind(cartItem)
    }

    override fun getItemCount(): Int {
        return cartItems.size
    }

    fun setCartItems(items: List<CartOrder>) {
        this.cartItems = items
        notifyDataSetChanged()
    }

    inner class CartViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        private val productName: TextView = itemView.findViewById(R.id.cartName)
        private val productPrice: TextView = itemView.findViewById(R.id.cartPrice)
        private val quantity: TextView = itemView.findViewById(R.id.quantityTvCart)
        private val deleteButton: ImageView = itemView.findViewById(R.id.clearIcon)
        private val productImage: ImageView = itemView.findViewById(R.id.cartImage)

        fun bind(cartItem: CartOrder) {
            productName.text = cartItem.productName
            productPrice.text = "$${cartItem.totalPrice}"
            quantity.text = cartItem.qty.toString()

            // Use 'context' instead of 'Context'
            Glide.with(context)
                .load("${API_URL}articles/${cartItem.images}") // Image URL
                .placeholder(R.drawable.img) // Optional placeholder image
                .error(R.drawable.img) // Optional error image
                .into(productImage)

            deleteButton.setOnClickListener {
                Toast.makeText(context, "Item deleted", Toast.LENGTH_SHORT).show()
                itemClickAdapter.onItemDeleteClick(cartItem)
            }

            // Optional: If you want to handle item updates
            itemView.setOnClickListener {
                itemClickAdapter.onItemUpdateClick(cartItem)
            }
        }
    }
}

interface CartItemClickAdapter {
    fun onItemDeleteClick(cartOrder: CartOrder)
    fun onItemUpdateClick(cartOrder: CartOrder)
}
