package com.softsim.lcsoftsim.ui.home

import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.softsim.lcsoftsim.R
import com.softsim.lcsoftsim.api.ApiConfig
import com.softsim.lcsoftsim.data.model.Category
import com.softsim.lcsoftsim.data.model.PlanPack
import com.softsim.lcsoftsim.ui.adapter.CategoryAdapter
import com.softsim.lcsoftsim.ui.adapter.SalesOffertAdapter
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class HomeFragment : Fragment() {

    private lateinit var newRecView: RecyclerView
    private lateinit var verticalView: RecyclerView
    private lateinit var categoryAdapter: CategoryAdapter
    private lateinit var salesOffertAdapter: SalesOffertAdapter

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(R.layout.fragment_home, container, false)

        // Initialize RecyclerViews
        newRecView = view.findViewById(R.id.newRecView)
        newRecView.layoutManager = LinearLayoutManager(context, LinearLayoutManager.HORIZONTAL, false)

        verticalView = view.findViewById(R.id.verticalView)
        verticalView.layoutManager = LinearLayoutManager(context)

        // Fetch data
        fetchSalesPacks()
        fetchCategories()

        return view
    }



    private fun fetchSalesPacks() {
        CoroutineScope(Dispatchers.IO).launch {
            try {
                val response = ApiConfig.apiService.getPlanPackSales()
                if (response.isSuccessful) {
                    val apiResponse = response.body()
                    if (apiResponse != null && apiResponse.status == 200) {
                        val listPlanck = apiResponse.data
                    Log.d("API_SUCCESS", "Fetched sales packs: $listPlanck")
                    launch(Dispatchers.Main) {
                        setupSalesOffertRecyclerView(listPlanck)
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

    private fun fetchCategories() {
        CoroutineScope(Dispatchers.IO).launch {
            try {
                val response = ApiConfig.apiService.getCategories()
                if (response.isSuccessful) {
                    val apiResponse = response.body()
                    if (apiResponse != null && apiResponse.status == 200) {
                        val categories = apiResponse.data
                        Log.d("API_SUCCESS", "Fetched categories: $categories")
                        launch(Dispatchers.Main) {
                            setupCategoryRecyclerView(categories)
                        }
                    } else {
                        Log.e("API_ERROR", "Error in API response: ${apiResponse?.message}")
                    }
                } else {
                    Log.e("API_ERROR", "Error fetching categories: ${response.errorBody()?.string()}")
                }
            } catch (e: Exception) {
                Log.e("API_ERROR", "Exception fetching categories: $e")
            }
        }
    }


    private fun setupSalesOffertRecyclerView(salesPacks: List<PlanPack>) {
        salesOffertAdapter = SalesOffertAdapter(ArrayList(salesPacks), requireContext())
        verticalView.adapter = salesOffertAdapter
    }

    private fun setupCategoryRecyclerView(categories: List<Category>) {
        categoryAdapter = CategoryAdapter(ArrayList(categories), requireContext())
        newRecView.adapter = categoryAdapter
    }
}
