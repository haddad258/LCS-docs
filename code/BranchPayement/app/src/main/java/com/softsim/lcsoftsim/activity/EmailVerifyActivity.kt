package com.softsim.lcsoftsim.activity




import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.Handler
import android.view.View
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import com.softsim.lcsoftsim.R

import com.softsim.lcsoftsim.utils.ToastLcs




class EmailVerifyActivity : AppCompatActivity() {

    lateinit var EmailAddress:String
    lateinit var loginPassword:String

    lateinit var reSendEmail_emailVerifyPage:TextView
    lateinit var tryAgain_emailVerifyPage:Button
    lateinit var title_emailVerifyPage:TextView
    lateinit var msg_emailVerifyPage:TextView
    lateinit var image_emailVerifyPage:ImageView


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_email_verify)


        tryAgain_emailVerifyPage = findViewById(R.id.tryAgain_emailVerifyPage)
        title_emailVerifyPage = findViewById(R.id.title_emailVerifyPage)
        msg_emailVerifyPage = findViewById(R.id.msg_emailVerifyPage)
        image_emailVerifyPage = findViewById(R.id.image_emailVerifyPage)
        reSendEmail_emailVerifyPage = findViewById(R.id.reSendEmail_emailVerifyPage)

        EmailAddress = intent.getStringExtra("EmailAddress").toString()
        loginPassword = intent.getStringExtra("loginPassword").toString()


        verifyEmail()


        tryAgain_emailVerifyPage.setOnClickListener {
            verifyEmail()
        }

        reSendEmail_emailVerifyPage.setOnClickListener {
            sendEmailVerification()
        }
    }

    private fun sendEmailVerification() {

        if(EmailAddress != null || EmailAddress != "") {
            ToastLcs("New Link send your " + EmailAddress + " Email Address.")


        }
        else{
            ToastLcs("Failed")

        }
    }

    private fun verifyEmail() {

        ToastLcs("Verifier")

        }
    }

