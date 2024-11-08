package com.softsim.lcsoftsim
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.MenuItem
import com.softsim.lcsoftsim.R
import com.softsim.lcsoftsim.ui.*
import com.google.android.material.bottomnavigation.BottomNavigationView
import com.softsim.lcsoftsim.ui.PlanPacks.PlanPacksFragment
import com.softsim.lcsoftsim.ui.bag.BagFragment
//import com.softsim.lcsoftsim.ui.Categories.OrdersActivites
//import com.softsim.lcsoftsim.ui.Profile.ProfileFragment
import com.softsim.lcsoftsim.ui.dashboard.DashboardFragment
import com.softsim.lcsoftsim.ui.home.HomeFragment
import com.softsim.lcsoftsim.ui.myaccount.Account
import com.softsim.lcsoftsim.ui.notifications.NotificationsFragment
import com.softsim.lcsoftsim.ui.profiles.ProfilesManagement
//import com.softsim.lcsoftsim.ui.card.BagFragment
//import com.softsim.lcsoftsim.ui.profiles.ProfileSoftSimFragment
import com.softsim.lcsoftsim.utils.SharedPreferencesManager

class MainActivity  : AppCompatActivity(), BottomNavigationView.OnNavigationItemSelectedListener {

    lateinit var bottomNavigationView:BottomNavigationView




    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        SharedPreferencesManager.init(this)
        setContentView(R.layout.activity_main)



        bottomNavigationView = findViewById(R.id.bottomNavMenu)
        bottomNavigationView.setOnNavigationItemSelectedListener(this)

        supportFragmentManager.beginTransaction().replace(R.id.nav_fragment, HomeFragment() ).commit()
    }


    override fun onNavigationItemSelected(item: MenuItem): Boolean {
        when (item.itemId) {
            R.id.homeMenu -> {
                val fragment = HomeFragment()
                supportFragmentManager.beginTransaction().replace(R.id.nav_fragment, fragment, fragment.javaClass.simpleName)
                    .commit()
                return true
            }
            R.id.shopMenu -> {
                val fragment = PlanPacksFragment()
                supportFragmentManager.beginTransaction().replace(R.id.nav_fragment, fragment, fragment.javaClass.simpleName)
                    .commit()
                return true
            }
            R.id.bagMenu -> {
                val fragment = BagFragment()
                supportFragmentManager.beginTransaction().replace(R.id.nav_fragment, fragment, fragment.javaClass.simpleName)
                    .commit()
                return true
            }
            R.id.favMenu -> {
                val fragment = ProfilesManagement()
                supportFragmentManager.beginTransaction().replace(R.id.nav_fragment, fragment, fragment.javaClass.simpleName)
                    .commit()
                return true
            }
            R.id.profiles -> {
                val fragment = Account()
                supportFragmentManager.beginTransaction().replace(R.id.nav_fragment, fragment, fragment.javaClass.simpleName)
                    .commit()
                return true
            }




        }
        return false
    }
}