package com.softsim.lcsoftsim.activity

import android.content.Intent
import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.util.Log
import android.util.Patterns
import android.view.View
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import androidx.lifecycle.lifecycleScope
import com.softsim.lcsoftsim.MainActivity
import com.softsim.lcsoftsim.R
import com.softsim.lcsoftsim.api.ApiConfig
import com.softsim.lcsoftsim.data.model.LoginRequest
import com.softsim.lcsoftsim.data.model.LoginResponse
import com.softsim.lcsoftsim.ui.commun.LoadingDialog
import com.softsim.lcsoftsim.utils.SharedPreferencesManager
import kotlinx.coroutines.launch
import retrofit2.Response

class LoginActivity : AppCompatActivity() {

    private lateinit var emailEt: EditText
    private lateinit var passEt: EditText
    private lateinit var emailError: TextView
    private lateinit var passwordError: TextView
    private lateinit var loadingDialog: LoadingDialog

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        initViews()
        setupListeners()
        loadingDialog = LoadingDialog(this)
    }

    private fun initViews() {
        emailEt = findViewById(R.id.emailEt)
        passEt = findViewById(R.id.PassEt)
        emailError = findViewById(R.id.emailError)
        passwordError = findViewById(R.id.passwordError)

        findViewById<Button>(R.id.loginBtn).setOnClickListener { validateInputAndSignIn() }
        findViewById<TextView>(R.id.forgottenPassTv).setOnClickListener {
            startActivity(Intent(this, EmailVerifyActivity::class.java))
        }
        findViewById<TextView>(R.id.signUpBtnV).setOnClickListener {
            startActivity(Intent(this, SignUpActivity::class.java))
        }
    }

    private fun setupListeners() {
        emailEt.addTextChangedListener(object : TextWatcher {
            override fun afterTextChanged(s: Editable) {
                validateEmail()
            }
            override fun beforeTextChanged(s: CharSequence, start: Int, count: Int, after: Int) {
                clearEmailError()
            }
            override fun onTextChanged(s: CharSequence, start: Int, before: Int, count: Int) {
                validateEmail()
            }
        })

        passEt.addTextChangedListener(object : TextWatcher {
            override fun afterTextChanged(s: Editable) {
                validatePassword()
            }
            override fun beforeTextChanged(s: CharSequence, start: Int, count: Int, after: Int) {
                clearPasswordError()
            }
            override fun onTextChanged(s: CharSequence, start: Int, before: Int, count: Int) {
                validatePassword()
            }
        })
    }

    private fun validateEmail() {
        val email = emailEt.text.toString()
        if (email.isEmpty()) {
            emailError.visibility = View.VISIBLE
            emailError.text = "Email can't be empty"
            clearEmailIcon()
        } else if (Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
            clearEmailError()
            setEmailIcon(R.drawable.ic_check)
        } else {
            emailError.visibility = View.VISIBLE
            emailError.text = "Enter a valid email"
            clearEmailIcon()
        }
    }

    private fun validatePassword() {
        val password = passEt.text.toString()
        if (password.isEmpty()) {
            passwordError.visibility = View.VISIBLE
            passwordError.text = "Password can't be empty"
            clearPasswordIcon()
        } else if (password.length > 4) {
            clearPasswordError()
            setPasswordIcon(R.drawable.ic_check)
        } else {
            clearPasswordIcon()
        }
    }

    private fun validateInputAndSignIn() {
        if (emailError.visibility == View.GONE && passwordError.visibility == View.GONE) {
            signInUser(emailEt.text.toString().trim(), passEt.text.toString().trim())
        }
    }

    private fun signInUser(email: String, password: String) {
        loadingDialog.startLoadingDialog()

        val loginRequest = LoginRequest(email, password)
        val apiService = ApiConfig.apiService

        lifecycleScope.launch {
            try {
                val response: Response<LoginResponse> = apiService.loginUser(loginRequest)
                loadingDialog.dismissDialog()
                handleLoginResponse(response)
            } catch (e: Exception) {
                loadingDialog.dismissDialog()
                Log.e("LoginActivity", "Login failed", e)
                showToast("Login failed: ${e.message ?: "An error occurred"}")
            }
        }
    }

    private fun handleLoginResponse(response: Response<LoginResponse>) {
        if (response.isSuccessful) {
            val loginResponse = response.body()
            if (loginResponse?.success == true) {
                SharedPreferencesManager.saveToken(loginResponse.token)
                startActivity(Intent(this, MainActivity::class.java))
                showToast("Signed in successfully")
            } else {
                startActivity(Intent(this, LoginActivity::class.java))
                showToast("Login failed: ${loginResponse?.message ?: "Unknown error"}")
            }
        } else {
            startActivity(Intent(this, LoginActivity::class.java))
            showToast("Login failed: ${response.message()}")
        }
    }

    private fun setEmailIcon(drawableId: Int) {
        emailEt.setCompoundDrawablesWithIntrinsicBounds(null, null, ContextCompat.getDrawable(applicationContext, drawableId), null)
    }

    private fun setPasswordIcon(drawableId: Int) {
        passEt.setCompoundDrawablesWithIntrinsicBounds(null, null, ContextCompat.getDrawable(applicationContext, drawableId), null)
    }

    private fun clearEmailIcon() {
        emailEt.setCompoundDrawablesWithIntrinsicBounds(null, null, null, null)
    }

    private fun clearPasswordIcon() {
        passEt.setCompoundDrawablesWithIntrinsicBounds(null, null, null, null)
    }

    private fun clearEmailError() {
        emailError.visibility = View.GONE
    }

    private fun clearPasswordError() {
        passwordError.visibility = View.GONE
    }

    private fun showToast(message: String) {
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show()
    }
}
