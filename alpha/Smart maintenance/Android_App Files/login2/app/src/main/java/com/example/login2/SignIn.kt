// Import statements, importing necessary libraries and packages
package com.example.login2

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import com.example.login2.databinding.ActivitySigninBinding
import com.google.firebase.auth.FirebaseAuth

class SignInActivity : AppCompatActivity() {
    // Declaring FirebaseAuth instance for user authentication
    private lateinit var binding: ActivitySigninBinding
    private lateinit var firebaseAuth: FirebaseAuth
    // Setting the view to the Sign in page, as in xml
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivitySigninBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // Obtaining pointer to FirebaseAuth database for retrieval
        firebaseAuth = FirebaseAuth.getInstance()
        // Switching to sign up page, if user clicks on the redirect link
        binding.textView.setOnClickListener {
            val intent = Intent(this, SignupActivity::class.java)
            startActivity(intent)
        }
        // As sign in button is clicked, user details are verified
        binding.button.setOnClickListener {
            //Variables to retrieve and authenticate the user
            val email = binding.emailEt.text.toString()
            val pass = binding.passET.text.toString()
            //If the user has entered sign in information
            if (email.isNotEmpty() && pass.isNotEmpty()) {
                //Sign in to the app via firebaseAuth instance, followed by switch to home page
                firebaseAuth.signInWithEmailAndPassword(email, pass).addOnCompleteListener {
                    if (it.isSuccessful) {
                        val serviceIntent = Intent(this, SensorMonitoringService::class.java)
                        ContextCompat.startForegroundService(this, serviceIntent)
                        val intent = Intent(this, MainActivity::class.java)
                        startActivity(intent)
                    } else {
                        //Error message indicating firebase authentication error
                        Toast.makeText(this, it.exception.toString(), Toast.LENGTH_SHORT).show()

                    }
                }
            } else {
                //Error message indicating empty fields
                Toast.makeText(this, "Empty Fields Are not Allowed !!", Toast.LENGTH_SHORT).show()

            }
        }
    }

    override fun onStart() {
        super.onStart()

        if (this.firebaseAuth.currentUser != null) {
            val intent = Intent(this, MainActivity::class.java)
            startActivity(intent)
        }
    }
}