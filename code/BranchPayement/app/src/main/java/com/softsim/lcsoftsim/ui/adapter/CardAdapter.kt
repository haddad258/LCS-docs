package com.softsim.lcsoftsim.ui.adapter

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.*
import androidx.recyclerview.widget.RecyclerView
import com.softsim.lcsoftsim.R
import com.softsim.lcsoftsim.data.model.CardEntity

class CardAdapter(private val ctx: Context, private val listener: CarDItemClickAdapter) :
    RecyclerView.Adapter<CardAdapter.CardViewHolder>() {

    private val cardList: ArrayList<CardEntity> = arrayListOf()

    // ViewHolder class to hold and reuse views
    class CardViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val cardNumber: TextView = itemView.findViewById(R.id.cardNumber_singleCard)
        val cardHName: TextView = itemView.findViewById(R.id.cardHolderName_singleCard)
        val exp: TextView = itemView.findViewById(R.id.expiryDate_singleCard)
        val layD: LinearLayout = itemView.findViewById(R.id.useDefault_Layout)
        val checkbox: CheckBox = itemView.findViewById(R.id.checkBox_SingleCard)
        val cardImage: ImageView = itemView.findViewById(R.id.cardBrandImage_singleCard)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): CardViewHolder {
        val cardView = LayoutInflater.from(ctx).inflate(R.layout.single_card, parent, false)
        return CardViewHolder(cardView)
    }

    override fun onBindViewHolder(holder: CardViewHolder, position: Int) {
        val cardItem: CardEntity = cardList[position]

        // Set card brand image based on brand type
        holder.cardImage.setImageResource(R.drawable.ic_mastercard)

        holder.cardHName.text = cardItem.cardholder_name
        holder.exp.text = cardItem.expiration_date
        holder.cardNumber.text = cardItem.card_number_token

        holder.layD.visibility = if (cardList.size > 1) View.VISIBLE else View.GONE

        // Set checkbox click listener (uncomment and modify if necessary)
        // holder.checkbox.setOnClickListener {
        //     val editor: SharedPreferences.Editor = defaultCard.edit()
        //     if (holder.checkbox.isChecked) {
        //         holder.checkbox.isChecked = false
        //         editor.putBoolean("isHaveDefaultCard", false)
        //         editor.putString("cardNumber", "")
        //     } else {
        //         holder.checkbox.isChecked = true
        //         editor.putBoolean("isHaveDefaultCard", true)
        //         editor.putString("cardNumber", cardItem.number)
        //     }
        //     editor.apply()
        // }

        // Handle delete and update actions
        holder.itemView.setOnLongClickListener {
            listener.onItemDeleteClick(cardItem)
            true
        }

        holder.itemView.setOnClickListener {
            listener.onItemUpdateClick(cardItem)
        }
    }

    override fun getItemCount(): Int = cardList.size

    // Method to update the list of cards
    fun updateList(newList: List<CardEntity>) {
        cardList.clear()
        cardList.addAll(newList)
        notifyDataSetChanged()
    }
}

interface CarDItemClickAdapter {
    fun onItemDeleteClick(cardEntity: CardEntity)
    fun onItemUpdateClick(cardEntity: CardEntity)
}

