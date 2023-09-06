// Import statements, importing necessary libraries and packages
package com.example.login2

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.cardview.widget.CardView
// Page that displays washrooms in order, to select from for further detailed display
class Washroom : AppCompatActivity() {
    // Setting the view to the Washroom page, as in xml, using view binding
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_washroom)
        // Cardview that redirects to required status page by passing the floor and gender as parameters into the intent, ie, the called class
        val Floor1Mens = findViewById<CardView>(R.id.Flr1MenCardView)
        Floor1Mens.setOnClickListener {
            val intent1 = Intent(this, washroomStatus::class.java)
            // Passing the respective floor and gender specifications as parameters
            intent1.putExtra("washroomId", "F1m")
            startActivity(intent1)
        }
        val Floor1Women = findViewById<CardView>(R.id.Flr1WomenCardView)
        Floor1Women.setOnClickListener {
            val intent1 = Intent(this, washroomStatus::class.java)
            intent1.putExtra("washroomId", "F1f")
            startActivity(intent1)
        }
        val Floor2Men = findViewById<CardView>(R.id.Flr2MenCardView)
        Floor2Men.setOnClickListener {
            val intent1 = Intent(this, washroomStatus::class.java)
            intent1.putExtra("washroomId", "F2m")
            startActivity(intent1)
        }
        val Floor2Women = findViewById<CardView>(R.id.Flr2WomenCardView)
        Floor2Women.setOnClickListener {
            val intent1 = Intent(this, washroomStatus::class.java)
            intent1.putExtra("washroomId", "F2f")
            startActivity(intent1)
        }
        val Floor3Men = findViewById<CardView>(R.id.Flr3MenCardView)
        Floor3Men.setOnClickListener {
            val intent1 = Intent(this, washroomStatus::class.java)
            intent1.putExtra("washroomId", "F3m")
            startActivity(intent1)
        }
        val Floor3Women = findViewById<CardView>(R.id.Flr3WomenCardView)
        Floor3Women.setOnClickListener {
            val intent1 = Intent(this, washroomStatus::class.java)
            intent1.putExtra("washroomId", "F3f")
            startActivity(intent1)
        }
    }
}