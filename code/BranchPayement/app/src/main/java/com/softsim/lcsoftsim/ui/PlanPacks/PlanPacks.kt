package com.softsim.lcsoftsim.ui.PlanPacks

import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.softsim.lcsoftsim.R
import com.softsim.lcsoftsim.api.ApiConfig
import com.softsim.lcsoftsim.data.model.PlanPack
import com.softsim.lcsoftsim.ui.adapter.PlanPackAdapter
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class PlanPacksFragment : Fragment() {

    private lateinit var verticalView: RecyclerView
    private lateinit var planPackAdapter: PlanPackAdapter

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val view = inflater.inflate(R.layout.fragment_planpack, container, false)

        // Initialize RecyclerView
        verticalView = view.findViewById(R.id.verticalView)
        verticalView.layoutManager = LinearLayoutManager(context)

        // Fetch data
        fetchPlanPacks()

        return view
    }

    private fun fetchPlanPacks() {
        CoroutineScope(Dispatchers.IO).launch {
        // Launch a coroutine in the lifecycleScope of the fragment to handle API calls
        try {
            val response = ApiConfig.apiService.getPlanPacks()
            if (response.isSuccessful) {
                val apiResponse = response.body()
                if (apiResponse != null && apiResponse.status == 200) {
                    val listPlanck = apiResponse.data
                    Log.d("API_SUCCESS", "Fetched sales packs: $listPlanck")
                    launch(Dispatchers.Main) {
                        setupPlanPackRecyclerView(listPlanck)
                    }
                } else {
                    Log.e("API_ERROR", "Error in API response: ${apiResponse?.message}")
                }
            } else {
                Log.e("API_ERROR", "Error fetching sales packs: ${response.errorBody()}")
            }
        } catch (e: Exception) {
            Log.e("API_ERROR", "Exception fetching sales packs: $e")
        }
    }
    }

    private fun setupPlanPackRecyclerView(planPacks: List<PlanPack>) {
        // Initialize and set the adapter with the fetched plan packs
        planPackAdapter = PlanPackAdapter(ArrayList(planPacks), requireContext())
        verticalView.adapter = planPackAdapter
    }
}
