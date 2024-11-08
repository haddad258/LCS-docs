package com.softsim.lcsoftsim.ui.profiles

import android.content.Context
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.ListView
import androidx.appcompat.app.AlertDialog
import androidx.fragment.app.Fragment
import com.softsim.lcsoftsim.R
import com.softsim.lcsoftsim.data.local.profile.DataManager
import com.softsim.lcsoftsim.data.local.profile.ProfilesM
import com.softsim.lcsoftsim.ui.adapter.SavedProfileAdaptater
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch


class SavedProfilesFragment : Fragment() {

    private lateinit var listView: ListView
    private lateinit var dataManager: DataManager

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(R.layout.savedprofiles, container, false)
        listView = view.findViewById(R.id.listprofiles)

        view.findViewById<Button>(R.id.button).setOnClickListener {
            fetchDataAndShowList()
        }

        return view
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        dataManager = DataManager(requireContext())
        fetchDataAndShowList()
    }

    private fun fetchDataAndShowList() {
        CoroutineScope(Dispatchers.Main).launch {
            try {
                val user = "RetrofitInstance.api.getUser"
                Log.d("SavedProfilesFragment", user)

                val profiles = dataManager.getAllProfiles()
                Log.d("SavedProfilesFragment", profiles.toString())

                if (profiles.isNullOrEmpty()) {
                    Log.d("SavedProfilesFragment", "Profiles list is empty")
                } else {
                    displayProfilesList(profiles)
                }
            } catch (e: Exception) {
                Log.e("SavedProfilesFragment", "Error fetching data", e)
                showErrorDialog()
            }
        }
    }

    private fun displayProfilesList(profiles: List<ProfilesM>) {
        val adapter = SavedProfileAdaptater(requireContext(), profiles, false)
        listView.adapter = adapter
    }

    private fun showErrorDialog() {
        AlertDialog.Builder(requireContext())
            .setTitle("Error")
            .setMessage("Failed to fetch data from API")
            .setPositiveButton("OK") { dialog, _ -> dialog.dismiss() }
            .show()
    }
}
