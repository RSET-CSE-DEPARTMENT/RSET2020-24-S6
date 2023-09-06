//Importing necessary packages and libraries-login2 is the project name
package com.example.login2

import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.login2.databinding.ActivityRegisterComplaintBinding
import com.google.firebase.firestore.FirebaseFirestore

class registerComplaint : AppCompatActivity() {
    private lateinit var binding: ActivityRegisterComplaintBinding
    //Creating FirebaseFirestore instance to access complaint database in firebase firestore
    private lateinit var db: FirebaseFirestore
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        //Setting the view as the Register Complaint page, as in xml
        binding = ActivityRegisterComplaintBinding.inflate(layoutInflater)
        setContentView(binding.root)
        //Obtaining pointer to Firestore database
        db = FirebaseFirestore.getInstance()
        //As submit button is clicked, data entered is store to the database
        binding.SubmitRegisterComplaintButton.setOnClickListener {
            //The hashmap stores the data to be written to the database
            val hmp = hashMapOf<String, Any>()
            //If the washroom is ticked as not clean, store the same information
            if (binding.cb1.isChecked) {
                hmp["clean"] = "no"
            } else {
                hmp["clean"] = "yes"
            }
            //If the washroom is ticked as wet, store the same information
            if (binding.cb2.isChecked) {
                hmp["floor"] = "wet"
            } else {
                hmp["floor"] = "dry"
            }
            //Obtain the floor number and gender information of the washroom which has the complaint
            if (binding.rdF2.isChecked){
                hmp["flno"]=2
            }
            if (binding.rdF1.isChecked){
                hmp["flno"]=1
            }
            if (binding.rdF3.isChecked){
                hmp["flno"]=3
            }
            if (binding.rdM.isChecked){
                hmp["gender"]="male"
            }
            if (binding.rdW.isChecked){
                hmp["gender"]="female"
            }
            //Retrieve the data entered in the 'other' text box
            val text = binding.ComplaintTextField.text.toString()
            hmp["other"] = text
            //Storing the hashmap data into the complaints database in firebase firestore
            db.collection("Complaints")
                .document()
                .set(hmp)
                .addOnSuccessListener {
                    //Toast message indicating successful insertion
                    Toast.makeText(
                        this,
                        "HashMap added to Firestore successfully!",
                        Toast.LENGTH_SHORT
                    ).show()
                }
                .addOnFailureListener { e ->
                    Toast.makeText(
                        //Toast message indicating unsuccessful insertion
                        this,
                        "Failed to add HashMap to Firestore: ${e.message}",
                        Toast.LENGTH_SHORT
                    ).show()
                }
        }
    }
}

