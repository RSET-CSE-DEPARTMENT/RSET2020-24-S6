// Import statements, importing necessary libraries and packages
package com.example.login2

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.login2.databinding.ActivitySignupBinding
import com.google.firebase.auth.FirebaseAuth

class SignupActivity : AppCompatActivity() {
    // Declaring FirebaseAuth instance for user creation
    private lateinit var binding: ActivitySignupBinding
    private lateinit var firebaseAuth: FirebaseAuth
    // Setting the view to the Sign up page, as in xml, using view binding
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivitySignupBinding.inflate(layoutInflater)
        setContentView(binding.root)
        // Obtaining pointer to FirebaseAuth database for retrieval
        firebaseAuth = FirebaseAuth.getInstance()
        // Switching to sign in page, if user clicks on the redirect link
        binding.textView.setOnClickListener {
            val intent = Intent(this, SignInActivity::class.java)
            startActivity(intent)
        }
        // As sign up button is clicked, user details are stored into the database
        binding.button.setOnClickListener {
            // Variables to retrieve and store the user details
            val email = binding.emailEt.text.toString()
            val pass = binding.passET.text.toString()
            val confirmPass = binding.confirmPassEt.text.toString()
            //If the user has entered sign up information
            if (email.isNotEmpty() && pass.isNotEmpty() && confirmPass.isNotEmpty()) {
                // Checking if password is confirmed
                if (pass == confirmPass) {
                    // Creating and storing user details into the database using FirebaseAuth instance
                    firebaseAuth.createUserWithEmailAndPassword(email, pass).addOnCompleteListener {
                        if (it.isSuccessful) {
                            // Switching to sign in page for user log in post successful sign up
                            val intent = Intent(this, SignInActivity::class.java)
                            startActivity(intent)
                        } else {
                            // Error message indicating unsuccessful sign up
                            Toast.makeText(this, it.exception.toString(), Toast.LENGTH_SHORT).show()

                        }
                    }
                } else {
                    // Error message indicating passwords not matching
                    Toast.makeText(this, "Password is not matching", Toast.LENGTH_SHORT).show()
                }
            } else {
                // Error message indicating fields left empty by user
                Toast.makeText(this, "Empty Fields Are not Allowed !!", Toast.LENGTH_SHORT).show()

            }
        }
    }
}
