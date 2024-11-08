package com.softsim.lcsoftsim.activity

import android.app.ProgressDialog
import android.content.Intent
import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import androidx.lifecycle.lifecycleScope
import com.softsim.lcsoftsim.api.ApiConfig
import com.softsim.lcsoftsim.data.model.RegisterRequest
import com.softsim.lcsoftsim.data.model.RegisterResponse
import com.softsim.lcsoftsim.R
import com.softsim.lcsoftsim.ui.commun.LoadingDialog
import com.softsim.lcsoftsim.utils.ToastLcs
import kotlinx.coroutines.launch
import retrofit2.Response

class SignUpActivity : AppCompatActivity() {

    private lateinit var fullNameEt: EditText
    private lateinit var emailEt: EditText
    private lateinit var cinEt: EditText
    private lateinit var passwordEt: EditText
    private lateinit var confirmPasswordEt: EditText
    private lateinit var loadingDialog: LoadingDialog
    private lateinit var progressDialog: ProgressDialog

    private val emailPattern = "[a-zA-Z0-9._-]+@[a-z]+\\.+[a-z]+"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_sign_up)

        initViews()
        setupListeners()
    }

    private fun initViews() {
        fullNameEt = findViewById(R.id.nameEt_signUpPage)
        emailEt = findViewById(R.id.emailEt_signUpPage)
        passwordEt = findViewById(R.id.PassEt_signUpPage)
        cinEt = findViewById(R.id.cin)
        confirmPasswordEt = findViewById(R.id.cPassEt_signUpPage)
        progressDialog = ProgressDialog(this)
        loadingDialog = LoadingDialog(this)
    }

    private fun setupListeners() {
        val signUpBtn = findViewById<Button>(R.id.signUpBtn_signUp)
        val signInTv = findViewById<TextView>(R.id.signInTv_signUpPage)

        signUpBtn.setOnClickListener { validateInput() }
        signInTv.setOnClickListener { navigateToLogin() }
        setupTextWatchers()
    }

    private fun setupTextWatchers() {
        addTextWatcher(fullNameEt) { updateDrawable(fullNameEt, it.length >= 4) }
        addTextWatcher(emailEt) { updateDrawable(emailEt, it.matches(emailPattern.toRegex())) }
        addTextWatcher(passwordEt) { updateDrawable(passwordEt, it.length > 5) }
        addTextWatcher(confirmPasswordEt) { updateDrawable(confirmPasswordEt, it.toString() == passwordEt.text.toString()) }
    }

    private fun updateDrawable(editText: EditText, isValid: Boolean) {
        val drawable = if (isValid) R.drawable.ic_check else null
        editText.setCompoundDrawablesWithIntrinsicBounds(null, null, drawable?.let { ContextCompat.getDrawable(applicationContext, it) }, null)
    }

    private fun addTextWatcher(editText: EditText, onTextChanged: (CharSequence) -> Unit) {
        editText.addTextChangedListener(object : TextWatcher {
            override fun afterTextChanged(s: Editable) {}
            override fun beforeTextChanged(s: CharSequence, start: Int, count: Int, after: Int) {}
            override fun onTextChanged(s: CharSequence, start: Int, before: Int, count: Int) {
                onTextChanged(s)
            }
        })
    }

    private fun validateInput() {
        when {
            fullNameEt.text.isEmpty() -> showToast("Name can't be empty!")
            emailEt.text.isEmpty() -> showToast("Email can't be empty!")
            !emailEt.text.matches(emailPattern.toRegex()) -> showToast("Enter a valid email")
            passwordEt.text.isEmpty() -> showToast("Password can't be empty!")
            passwordEt.text.toString() != confirmPasswordEt.text.toString() -> showToast("Passwords do not match")
            else -> signUpUser()
        }
    }

    private fun showToast(message: String) {
        ToastLcs(message)
    }

    private fun signUpUser() {
        showLoading()

        val registerRequest = RegisterRequest(
            fullNameEt.text.toString(),
            emailEt.text.toString(),
            cinEt.text.toString(),
            passwordEt.text.toString()
        )

        lifecycleScope.launch {
            try {
                val response = registerUser(registerRequest)
                handleSignUpResponse(response)
            } catch (e: Exception) {
                showToast("Sign up failed: ${e.message}")
            } finally {
                hideLoading()
            }
        }
    }

    private suspend fun registerUser(request: RegisterRequest): Response<RegisterResponse> {
        return ApiConfig.apiService.registerUser(request)
    }

    private fun handleSignUpResponse(response: Response<RegisterResponse>) {
        if (response.isSuccessful && response.body()?.status == 200) {
            navigateToLogin()
            showToast("Signed up successfully")
        } else {
            showToast("Sign up failed: ${response.body()?.message ?: "Unknown error"}")
        }
    }

    private fun navigateToLogin() {
        startActivity(Intent(this, LoginActivity::class.java))
    }

    private fun showLoading() {
        loadingDialog.startLoadingDialog()
        progressDialog.setTitle("Please Wait")
        progressDialog.setMessage("Creating Account")
        progressDialog.show()
    }

    private fun hideLoading() {
        loadingDialog.dismissDialog()
        progressDialog.dismiss()
    }
}
