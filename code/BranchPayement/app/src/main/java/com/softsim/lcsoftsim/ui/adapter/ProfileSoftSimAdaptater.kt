package com.softsim.lcsoftsim.ui.adapter

import android.content.Context
import android.graphics.Color
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.BaseAdapter
import android.widget.Button
import android.widget.TextView
import com.softsim.lcsoftsim.R
import com.softsim.lcsoftsim.data.local.profile.DataManager
import com.softsim.lcsoftsim.data.local.profile.ProfilesM

class ProfileSoftSimAdapter(
    private val context: Context,
    private val dataSource: List<ProfilesM>,
    private val isList1: Boolean
) : BaseAdapter() {

    private val inflater: LayoutInflater = LayoutInflater.from(context)
    private val dataManager: DataManager = DataManager(context)

    override fun getCount(): Int = dataSource.size

    override fun getItem(position: Int): ProfilesM = dataSource[position]

    override fun getItemId(position: Int): Long = position.toLong()

    override fun getView(position: Int, convertView: View?, parent: ViewGroup?): View {
        val view: View
        val viewHolder: ViewHolder

        if (convertView == null) {
            view = inflater.inflate(R.layout.profile_soft_sim, parent, false)
            viewHolder = ViewHolder(
                view.findViewById(R.id.todo_title),
                view.findViewById(R.id.todo_brand),
                view.findViewById(R.id.todo_iccid),
                view.findViewById(R.id.activeprofiles)
            )
            view.tag = viewHolder
        } else {
            view = convertView
            viewHolder = view.tag as ViewHolder
        }

        val profile = getItem(position)
        with(viewHolder) {
            titleTextView.text = "IMSI: ${profile.imsi}"
            brandTextView.text = profile.brand
            icciTextView.text = profile.iccid

            activeprofiles.apply {
                text = if (isList1) "Save Profile" else "Delete Profile"
                setBackgroundColor(if (isList1) Color.BLUE else Color.RED)
                setOnClickListener { handleActiveProfilesButtonClick(profile) }
            }
        }

        return view
    }

    private fun handleActiveProfilesButtonClick(profile: ProfilesM) {
        try {
            if (isList1) {
                val result = dataManager.addProfile(profile)
                Log.d("ProfileSoftSimAdapter", "Profile added: $result")
            } else {
                dataManager.deleteProfileByIccid(profile.iccid)
                Log.d("ProfileSoftSimAdapter", "Profile deleted")
            }
        } catch (e: Exception) {
            Log.e("ProfileSoftSimAdapter", "Error handling profile action: ${e.message}", e)
        }
    }

    private class ViewHolder(
        val titleTextView: TextView,
        val brandTextView: TextView,
        val icciTextView: TextView,
        val activeprofiles: Button
    )
}
