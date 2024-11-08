package com.softsim.lcsoftsim.utils

import android.app.Activity
import android.widget.Toast

class ToastLcs(message: String) {
    fun Activity.toast(msg: String){
        Toast.makeText(this, msg, Toast.LENGTH_SHORT).show()
    }

    fun Activity.cardXXGen(card: String):String{
        var size:Int = card.length
        var CardG: String = ""

        for(i in card){
            size--
            if(size < 4){
                CardG.plus(i)
            }
        }
        return "**** **** **** $CardG"
    }
}