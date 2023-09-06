//Importing necessary packages and libraries-login2 is the project name
package com.example.login2

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.example.login2.databinding.ActivityMainBinding
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.messaging.FirebaseMessaging

class MainActivity : AppCompatActivity() {
    //Declaring binding variable to set home page screen as view
    private lateinit var mainBinding:ActivityMainBinding
    //Declaring FirebaseAuth instance for user authentication
    private lateinit var user: FirebaseAuth

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        mainBinding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(/* view = */ mainBinding.root)
        FirebaseMessaging.getInstance().isAutoInitEnabled = true //to obtain firebase push notifications
        //Switching to washroom status page as the washroom button is clicked
        mainBinding.buttonWashroom.setOnClickListener {
            val intent2 = Intent(this, Washroom::class.java)
            startActivity(intent2)
        }
        //Switching to complaint view page when view complaint button is clicked
        mainBinding.viewComplaint.setOnClickListener {
            val intent3 = Intent(this, viewComplaints::class.java)
            startActivity(intent3)
        }
        //Switching to complaint register page when register complaint button is clicked
        mainBinding.buttonRegisterComplaint.setOnClickListener {
            val intent1 = Intent(this,registerComplaint::class.java)
            startActivity(intent1)
        }
        user= FirebaseAuth.getInstance()
        //To logout the current user as logout button is clicked, redirecting back to sign in page
        mainBinding.LogoutButton.setOnClickListener {
            user.signOut()
            startActivity(
                Intent(
                    this,
                    SignInActivity::class.java)
            )
            finish()
        }
    }
}