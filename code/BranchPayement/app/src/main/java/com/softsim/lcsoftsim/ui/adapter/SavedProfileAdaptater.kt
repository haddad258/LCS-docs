package com.softsim.lcsoftsim.ui.adapter



import android.content.Context
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.BaseAdapter
import android.widget.Button
import android.widget.TextView
import android.graphics.Color
import com.softsim.lcsoftsim.data.local.profile.DataManager
import com.softsim.lcsoftsim.data.local.profile.ProfilesM
import com.softsim.lcsoftsim.R

class SavedProfileAdaptater(
    private val context: Context,
    private val dataSource: List<ProfilesM>,
    private val isList1: Boolean
) : BaseAdapter() {

    private val inflater: LayoutInflater = LayoutInflater.from(context)
    private val dataManager: DataManager = DataManager(context)

    override fun getCount(): Int {
        return dataSource.size
    }

    override fun getItem(position: Int): Any {
        return dataSource[position]
    }

    override fun getItemId(position: Int): Long {
        return position.toLong()
    }

    override fun getView(position: Int, convertView: View?, parent: ViewGroup?): View {
        val view: View
        val viewHolder: ViewHolder

        if (convertView == null) {
            view = inflater.inflate(R.layout.profilesave, parent, false)
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

        val todo = getItem(position) as ProfilesM
        viewHolder.titleTextView.text = "imsi : " + todo.imsi
        viewHolder.brandTextView.text = todo.brand
        viewHolder.icciTextView.text =todo.iccid

        // Set button text based on list
        viewHolder.activeprofiles.text = if (isList1) "save Profiles" else "delete Profile"

        // Set button color based on list
        val buttonColor = if (isList1) {
            Color.BLUE // Blue color for list 1
        } else {
            Color.RED // Red color for list 2
        }
        viewHolder.activeprofiles.setBackgroundColor(buttonColor)

        viewHolder.activeprofiles.setOnClickListener {
            handleActiveProfilesButtonClick(todo)
        }

        return view
    }

    private fun handleActiveProfilesButtonClick(todo: ProfilesM) {
        if (isList1) {
            try {
                val result = dataManager.addProfile(todo)
                Log.d("addprofiles", "teesss: $result")
            } catch (e: Exception) {
                Log.d("IMSIOUThandleActiv", e.toString())
            }
        } else {
            try {
                var resltdelet = dataManager.deleteProfileByIccid(todo.iccid)

            } catch (e: Exception) {
                Log.d("IMSIOUThandleActiv", e.toString())
            }
        }
    }

    private class ViewHolder(
        val titleTextView: TextView,
        val brandTextView: TextView,
        val icciTextView: TextView,
        val activeprofiles: Button
    )
}
