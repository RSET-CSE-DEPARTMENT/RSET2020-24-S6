// Import statements, importing necessary libraries and packages
package com.example.login2

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.example.login2.databinding.ActivityViewComplaintsBinding
//import com.google.firebase.database.FirebaseDatabase
import com.google.firebase.firestore.FirebaseFirestore

class viewComplaints : AppCompatActivity() {
    // Setting the view to the View Complaints page, as in xml, using view binding
    private lateinit var binding: ActivityViewComplaintsBinding
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding= ActivityViewComplaintsBinding.inflate(layoutInflater)
        setContentView(binding.root)
        // Method to retrieve existing complaints from database and display them
        retrieveComplaints()
        // Redirecting to manage complaints page when button is clicked
        binding.deletecomp.setOnClickListener {
            val intent = Intent(this,manageComplaints::class.java)
            startActivity(intent)
        }
    }
    private fun retrieveComplaints(){
        // Variables to retrieve data from database and display with count in the text box
        val db = FirebaseFirestore.getInstance()
        var docs=""
        var i=1
        // Retrieving all complaints from database, appending them to the string for display, in numbered format
        db.collection("Complaints")
            .get()
            .addOnSuccessListener { result ->
                for (document in result) {
                    docs += i.toString()+". ${document.data}"
                    i++
                    docs+='\n'
                }
                binding.fetchcomp.text=docs
            }
            .addOnFailureListener { exception ->
                docs= "Error getting documents: $exception"// Displays error message indicating failure in retrieval
                binding.fetchcomp.text=docs
            }
    }
}