package com.softsim.lcsoftsim.ui.profiles

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.ListView
import androidx.appcompat.app.AlertDialog
import androidx.fragment.app.Fragment
import androidx.fragment.app.commit
import com.softsim.lcsoftsim.R
import com.softsim.lcsoftsim.api.ApiConfigToken
import com.softsim.lcsoftsim.data.local.profile.ProfilesM
import com.softsim.lcsoftsim.data.local.profile.DataManager
import com.softsim.lcsoftsim.ui.adapter.ProfileSoftSimAdapter
import kotlinx.coroutines.*

class ProfilesManagement : Fragment() {

    private lateinit var listView: ListView
    private lateinit var dataManager: DataManager

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(R.layout.fragment_profile_soft_sim, container, false)

        listView = view.findViewById(R.id.todo_list_view)
        dataManager = DataManager(requireContext())

        view.findViewById<Button>(R.id.button).setOnClickListener {
            fetchDataAndShowList()
        }

        view.findViewById<Button>(R.id.savedata).setOnClickListener {
            navigateToSavedProfiles()
        }

        return view
    }

    private fun navigateToSavedProfiles() {
        try {
            parentFragmentManager.commit {
                replace(R.id.nav_fragment, SavedProfilesFragment())
                addToBackStack(null) // Add to back stack to allow navigation back
            }
        } catch (e: Exception) {
            Log.e("ProfilesManagement", "Navigation error: ${e.message}")
            showErrorDialog("Failed to navigate to saved profiles.")
        }
    }

    private fun fetchDataAndShowList() {
        CoroutineScope(Dispatchers.Main).launch {
            try {
                val profiles = fetchDataFromAPI()
                if (profiles.isNullOrEmpty()) {
                    Log.w("ProfilesManagement", "Profile list is empty")
                }
                displayProfileList(profiles)
            } catch (e: Exception) {
                Log.e("ProfilesManagement", "Data fetching error: ${e.message}")
                showErrorDialog("Failed to fetch data from API.")
            }
        }
    }

    private suspend fun fetchDataFromAPI(): List<ProfilesM> = withContext(Dispatchers.IO) {
        try {
            val response = ApiConfigToken.apiService.getSubscriptionsProfiles()
            Log.d("ProfilesManagement", response.body().toString())
            if (response.isSuccessful) {
                response.body()?.data.orEmpty().also {
                    Log.d("ProfilesManagement", "Fetched profiles: $it")
                }
            } else {
                Log.e("ProfilesManagement", "API error: ${response.errorBody()}")
                emptyList()
            }
        } catch (e: Exception) {
            Log.e("ProfilesManagement", "Exception: $e")
            emptyList()
        }
    }

    private fun displayProfileList(profiles: List<ProfilesM>) {
        listView.adapter = ProfileSoftSimAdapter(requireContext(), profiles, true)
    }

    private fun showErrorDialog(message: String) {
        AlertDialog.Builder(requireContext())
            .setTitle("Error")
            .setMessage(message)
            .setPositiveButton("OK") { dialog, _ -> dialog.dismiss() }
            .show()
    }
}
