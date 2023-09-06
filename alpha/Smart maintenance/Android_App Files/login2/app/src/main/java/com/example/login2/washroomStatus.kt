// Import statements, importing necessary libraries and packages
package com.example.login2

import android.annotation.SuppressLint
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.example.login2.databinding.ActivityWashroomStatusBinding
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.database.*
// Page that displays washroom details- sensor readings, floor, gender
class washroomStatus : AppCompatActivity() {
    // Setting the view to the Washroom Status page, as in xml, using view binding
    private lateinit var binding: ActivityWashroomStatusBinding
    // Variables to navigate and fetch Sensor readings from Firebase Realtime Database
    private val database: FirebaseDatabase = FirebaseDatabase.getInstance()
    private val sensorRef: DatabaseReference = database.getReference("sensor_values/mq137")

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityWashroomStatusBinding.inflate(layoutInflater)
        setContentView(binding.root)
        retrieveWashroomStatus()
        startFetchingData()
    }

    @SuppressLint("SetTextI18n")
    // Method to retrieve the floor and gender of the selected washroom in previous page from database
    private fun retrieveWashroomStatus() {

        val db = FirebaseFirestore.getInstance()
        val washroomId = intent.getStringExtra("washroomId")
        val docRef = db.collection("Washrooms").document(washroomId.toString())
        docRef.get()
            .addOnSuccessListener { document ->
                if(document!=null){
                    binding.textView2.text = "Washroom data: ${document.data}"
                } else {
                    binding.textView2.text ="No such document"
                }
            }
            .addOnFailureListener { exception ->
                binding.textView2.text ="get failed with $exception"
            }

    }
    // Method to get sensor readings after each change in the read value in the database, ie, real time updates
    private fun startFetchingData() {
        sensorRef.addValueEventListener(object : ValueEventListener {
            @SuppressLint("SetTextI18n")
            override fun onDataChange(dataSnapshot: DataSnapshot) {
                val sensorValue = dataSnapshot.getValue(Double::class.java)
                // Displays the read value from the database
                binding.sensval.text="Received new sensor value: $sensorValue"
                /* Processing the received sensor value as needed */
            }
            // Error message indicating failure to retrieve sensor value from database
            @SuppressLint("SetTextI18n")
            override fun onCancelled(databaseError: DatabaseError) {
                binding.sensval.text="Data fetching canceled: ${databaseError.message}"
            }
        })
    }
}





