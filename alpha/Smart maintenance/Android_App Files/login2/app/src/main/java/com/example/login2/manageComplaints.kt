//Importing necessary packages and libraries-login2 is the project name
package com.example.login2

import android.os.Bundle
import android.view.View
import android.widget.AdapterView
import android.widget.ArrayAdapter
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.login2.databinding.ActivityManageComplaintsBinding
import com.google.firebase.firestore.FirebaseFirestore
class manageComplaints : AppCompatActivity() {
    private lateinit var binding: ActivityManageComplaintsBinding
    //Creating FirebaseFirestore instance to access complaint database in firebase firestore
    private lateinit var db: FirebaseFirestore
    //Setting the view as the manage complaints page as in xml
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding= ActivityManageComplaintsBinding.inflate(layoutInflater)
        setContentView(binding.root)
        //Method to navigate the drop down menu, and delete the required complaints
        spinnerfn()
    }
    private fun spinnerfn() {
        //Initialising the variables required for iterating through drop down menu
        val floors = resources.getStringArray(R.array.Floors)
        val genders = resources.getStringArray(R.array.Gender)
        val flfetch = resources.getStringArray(R.array.Floor)
        val genderfetch = resources.getStringArray(R.array.Gender2)
        val spinner = binding.spinner
        val adapter = ArrayAdapter(this, android.R.layout.simple_spinner_item, floors)
        //Setting position of both pointers to drop down menus as 0 intially
        var position1 = 0
        var position2 = 0
        spinner.adapter = adapter
        //If an item from the drop down menu for the floor selection is selected, the position is noted
        spinner.onItemSelectedListener = object :
            AdapterView.OnItemSelectedListener {
            override fun onItemSelected(
                parent: AdapterView<*>,
                view: View, position: Int, id: Long
            ) {
                position1 = position
                Toast.makeText(
                    this@manageComplaints,
                    getString(R.string.selected_item) + " " + "" + floors[position],
                    Toast.LENGTH_SHORT
                ).show()
            }
            //Toast message to pop up if nothing is selected
            override fun onNothingSelected(parent: AdapterView<*>) {
                Toast.makeText(this@manageComplaints, "Nothing selected", Toast.LENGTH_SHORT).show()
            }
        }
        //Above process repeated for second drop down menu, for gender selection
        val spinner2 = binding.spinner2
        val adapter2 = ArrayAdapter(
            this,
            android.R.layout.simple_spinner_item, genders
        )
        spinner2.adapter = adapter2
        spinner2.onItemSelectedListener = object :
            AdapterView.OnItemSelectedListener {
            override fun onItemSelected(
                parent: AdapterView<*>,
                view: View, position: Int, id: Long
            ) {
                position2 = position
                Toast.makeText(
                    this@manageComplaints,
                    getString(R.string.selected_item) + " " + "" + genders[position],
                    Toast.LENGTH_SHORT
                ).show()
            }

            override fun onNothingSelected(parent: AdapterView<*>) {
                Toast.makeText(this@manageComplaints, "Nothing selected", Toast.LENGTH_SHORT).show()
            }
        }
        //Getting a pointer to the firebase firestore database
        db = FirebaseFirestore.getInstance()
        //Deleting the complaints corresponding to the washroom of the required floor and gender when the delet button is clicked
        binding.delcomp.setOnClickListener {
            val query= db.collection("Complaints")
                .whereEqualTo("flno", flfetch[position1].toInt())
                .whereEqualTo("gender", genderfetch[position2])
                .get()
            query.addOnSuccessListener { result ->
                for (document in result) {
                        db.collection("Complaints").document(document.id).delete()
                }
                //Toast message to show the successful delete
                Toast.makeText(this@manageComplaints, "Delete Successful", Toast.LENGTH_SHORT)
                    .show()
            }
            query.addOnFailureListener { exception ->
                //Toast message to show the unsuccessful delete
                Toast.makeText(this@manageComplaints, "Error Occurred $exception", Toast.LENGTH_SHORT)
                    .show()
            }
        }
    }
}