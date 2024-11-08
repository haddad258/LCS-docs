package com.softsim.lcsoftsim.ui.adapter

import android.content.Intent
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.softsim.lcsoftsim.MainActivity
import com.softsim.lcsoftsim.R
import com.softsim.lcsoftsim.activity.PaymentModesActivity
import com.softsim.lcsoftsim.data.model.Orders

class OrderAdapter(private val ordersList: List<Orders>) : RecyclerView.Adapter<OrderAdapter.OrderViewHolder>() {

    // ViewHolder class to hold references to views
    inner class OrderViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val codeTextView: TextView = itemView.findViewById(R.id.order_code)
        val createdAtTextView: TextView = itemView.findViewById(R.id.order_created_at)
        val customerIdTextView: TextView = itemView.findViewById(R.id.order_customerId)
        val paymentMethodTextView: TextView = itemView.findViewById(R.id.order_payment_method)
        val statusTextView: TextView = itemView.findViewById(R.id.order_status)
        val subscriptionIdTextView: TextView = itemView.findViewById(R.id.order_subscription_id)
        val typeTextView: TextView = itemView.findViewById(R.id.order_type)
        val updatedAtTextView: TextView = itemView.findViewById(R.id.order_updated_at)
        val payButton: Button = itemView.findViewById(R.id.paybutton) // Reference to the "Pay" button
    }

    // Create a new ViewHolder when needed
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): OrderViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_order, parent, false)
        return OrderViewHolder(view)
    }

    // Bind data to the ViewHolder
    override fun onBindViewHolder(holder: OrderViewHolder, position: Int) {
        val order = ordersList[position]
        holder.codeTextView.text = order.order_number
        holder.customerIdTextView.text = order.customerId
        holder.statusTextView.text = order.customerId
        holder.subscriptionIdTextView.text = order.price
        holder.typeTextView.text = order.provider

        // Set OnClickListener on the Pay button
        holder.payButton.setOnClickListener {
            // Start MainActivity on button click
            val context = holder.itemView.context
            val intent = Intent(context, PaymentModesActivity::class.java)
            context.startActivity(intent)
        }
    }

    // Return the size of the dataset
    override fun getItemCount(): Int {
        return ordersList.size
    }
}
