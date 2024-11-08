package com.softsim.lcsoftsim.ui.adapter

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.softsim.lcsoftsim.R
import com.softsim.lcsoftsim.data.model.CardEntity

class PaymentModesAdapter(
    private val paymentModes: List<CardEntity>,
    private val context: Context,
    private val onItemSelected: (CardEntity) -> Unit // Callback for item selection
) : RecyclerView.Adapter<PaymentModesAdapter.PaymentModeViewHolder>() {

    private var selectedPosition = RecyclerView.NO_POSITION // Variable to track selected item position

    inner class PaymentModeViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val paymentModeText: TextView = itemView.findViewById(R.id.payment_mode_text)
        val cardHolderName: TextView = itemView.findViewById(R.id.card_holder_name)
        val cardType: TextView = itemView.findViewById(R.id.card_type)

        init {
            // Set an OnClickListener for the item view
            itemView.setOnClickListener {
                // Update selected position and notify the adapter
                selectedPosition = adapterPosition
                notifyDataSetChanged() // Refresh the view to show the selected state

                // Trigger the callback with the selected item
                onItemSelected(paymentModes[selectedPosition])
            }
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): PaymentModeViewHolder {
        val view = LayoutInflater.from(context).inflate(R.layout.item_payment_mode, parent, false)
        return PaymentModeViewHolder(view)
    }

    override fun onBindViewHolder(holder: PaymentModeViewHolder, position: Int) {
        val paymentMode = paymentModes[position]
        holder.paymentModeText.text = paymentMode.card_number_token
        holder.cardHolderName.text = paymentMode.cardholder_name
        holder.cardType.text = paymentMode.card_type

        // Change background color based on selection
        if (position == selectedPosition) {
            holder.itemView.setBackgroundColor(context.getColor(R.color.selected_color)) // Change this to your selected color
        } else {
            holder.itemView.setBackgroundColor(context.getColor(R.color.default_color)) // Change this to your default color
        }
    }

    override fun getItemCount(): Int {
        return paymentModes.size
    }
}
