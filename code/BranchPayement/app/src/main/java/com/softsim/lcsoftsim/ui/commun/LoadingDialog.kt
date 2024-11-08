package com.softsim.lcsoftsim.ui.commun

import android.app.Activity
import android.app.AlertDialog
import android.view.LayoutInflater
import com.softsim.lcsoftsim.R

class LoadingDialog(private val activity: Activity) {

    private var dialog: AlertDialog? = null

    fun startLoadingDialog() {
        val builder = AlertDialog.Builder(activity)
        val inflater: LayoutInflater = activity.layoutInflater
        val view = inflater.inflate(R.layout.custom_dialog, null)
        builder.setView(view)
        builder.setCancelable(false)
        dialog = builder.create()
        dialog?.show()
    }

    fun dismissDialog() {
        dialog?.dismiss()
    }
}
