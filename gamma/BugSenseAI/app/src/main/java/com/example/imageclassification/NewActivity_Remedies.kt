package com.example.imageclassification

import android.content.res.AssetManager
import android.graphics.Color
import android.graphics.Typeface
import android.graphics.drawable.GradientDrawable
import android.os.Bundle
import android.webkit.WebView
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import android.os.Handler
import android.text.Spannable
import android.text.SpannableStringBuilder
import android.text.style.AbsoluteSizeSpan
import android.text.style.StyleSpan
import android.util.TypedValue
import android.view.ViewGroup
import android.widget.LinearLayout
import android.widget.ProgressBar
import androidx.core.content.ContextCompat
import androidx.core.view.marginBottom
import java.io.BufferedReader
import java.io.IOException
import java.io.InputStream
import java.io.InputStreamReader

class NewActivity_Remedies : AppCompatActivity() {
    lateinit var text_view2 : TextView
    lateinit var progress_bar:ProgressBar
    lateinit var remedyTextView:TextView
    lateinit var containerLayout: LinearLayout
    lateinit var assetManager: AssetManager



    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.newactivity_remedies)
        progress_bar = findViewById(R.id.progressBar3)

        progress_bar.visibility = ProgressBar.VISIBLE
        containerLayout = findViewById(R.id.containerLayout)
        assetManager = applicationContext.assets


        Handler().postDelayed({
            // Display the actual content after 1 seconds

            showContent()
        }, 1000)

    }

    private fun showContent() {

        progress_bar.visibility = ProgressBar.GONE

        val inputValue = intent.getStringExtra("inputValue").toString()

        text_view2 = findViewById(R.id.textView2)
        text_view2.setText("Remedies: "+inputValue)

        // remedyTextView = findViewById(R.id.textView5)



        val fileName = when (inputValue) {
            "Bee" -> "bee_remedies.txt"
            "Mosquito" -> "mosquito_remedies.txt"
            "Spider" -> "spider_remedies.txt"
            "Tick" -> "tick_remedies.txt"
            else -> ""
        }

        if (fileName.isNotEmpty()) {
            val remedies = loadTextFromFile(fileName)
            displayRemedies(remedies)
        }
    }


    private fun loadTextFromFile(fileName: String): List<String> {
        val remedies = mutableListOf<String>()

        try {
            val inputStream = assetManager.open(fileName)
            val inputStreamReader = InputStreamReader(inputStream)
            val bufferedReader = BufferedReader(inputStreamReader)

            var line: String?
            while (bufferedReader.readLine().also { line = it } != null) {
                remedies.add(line ?: "")
            }

            bufferedReader.close()
        } catch (e: IOException) {
            e.printStackTrace()
        }

        return remedies
    }

    private fun displayRemedies(remedies: List<String>) {
        val layoutParams = LinearLayout.LayoutParams(
            LinearLayout.LayoutParams.MATCH_PARENT,
            LinearLayout.LayoutParams.WRAP_CONTENT
        )
        layoutParams.setMargins(0, 17, 0, 0)

        var currentTextView: TextView? = null

        for (remedy in remedies) {
            if (remedy.isNotBlank()) {
                if (remedy.startsWith("*")) {
                    // Create a new TextView for the next remedy
                    currentTextView = TextView(this)
                    currentTextView.typeface = Typeface.create(Typeface.SERIF, Typeface.NORMAL)
                    currentTextView.setTextColor(Color.WHITE)
                   // currentTextView.setTextSize(TypedValue.COMPLEX_UNIT_SP, 16f)
                    currentTextView.layoutParams = layoutParams
                    currentTextView.background = getRoundedBackground()
                    currentTextView.setPadding(13,13,13,13)
                    containerLayout.addView(currentTextView)
                    // Remove the leading "*" from the remedy text
                    val heading = remedy.substring(1).trim()
                    val formattedText = SpannableStringBuilder(heading)
                    formattedText.setSpan(StyleSpan(Typeface.BOLD), 0, heading.length, Spannable.SPAN_EXCLUSIVE_EXCLUSIVE)
                    currentTextView.text = formattedText
                    currentTextView.setTextSize(TypedValue.COMPLEX_UNIT_SP, 20f)
                } else {
                    // Append the explanation to the current TextView
                    val explanation = SpannableStringBuilder("\n$remedy")
                    explanation.setSpan(
                        AbsoluteSizeSpan(16, true), // Set the size to 16sp
                        0,
                        explanation.length,
                        Spannable.SPAN_EXCLUSIVE_EXCLUSIVE
                    )
                    currentTextView?.append(explanation)

                }
            }
            else{
                currentTextView?.append("\n")
            }
        }
    }


    private fun formatRemedy(remedyNumber: Int, remedyText: String): SpannableStringBuilder {
        val formattedText = SpannableStringBuilder()
        val boldStyle = StyleSpan(Typeface.BOLD)

        val heading = "Remedy $remedyNumber:"
        formattedText.append(heading)
        formattedText.append("\n")
        formattedText.setSpan(boldStyle, 0, heading.length, Spannable.SPAN_EXCLUSIVE_EXCLUSIVE)
        formattedText.append(remedyText)
        formattedText.append("\n")

        return formattedText
    }
    private fun getRoundedBackground(): GradientDrawable {
        val radius = 15f // Adjust the value to change the corner radius
        val shape = GradientDrawable()
        shape.cornerRadius = radius
        shape.setColor(Color.parseColor("#41046e"))
        return shape
    }
}