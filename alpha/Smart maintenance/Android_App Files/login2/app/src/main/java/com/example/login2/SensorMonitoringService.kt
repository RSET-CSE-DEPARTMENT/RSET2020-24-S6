// Import statements, importing necessary libraries and packages
package com.example.login2

import android.Manifest
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.Service
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Build
import android.os.Handler
import android.os.IBinder
import android.os.Looper
import androidx.core.app.ActivityCompat
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import com.google.firebase.database.DataSnapshot
import com.google.firebase.database.DatabaseError
import com.google.firebase.database.DatabaseReference
import com.google.firebase.database.FirebaseDatabase
import com.google.firebase.database.ValueEventListener
// SensorMonitoringService class inheriting from Service to run in the background
class SensorMonitoringService : Service() {
    // Variables for managing the service state and database references
    private var isServiceRunning = false
    private val database: FirebaseDatabase = FirebaseDatabase.getInstance()
    private val sensorRef: DatabaseReference = database.getReference("sensor_values/mq137")
    private lateinit var notificationManager: NotificationManagerCompat
    private var isMonitoringActive = false
    // Event listener to monitor changes in the sensor value
    private val sensorValueEventListener = object : ValueEventListener {
        override fun onDataChange(dataSnapshot: DataSnapshot) {
            // Extract the sensor value from the snapshot
            val sensorValue = dataSnapshot.getValue(Double::class.java)
            if (sensorValue != null) {
                // If sensor value exceeds 25 and monitoring is active, send a notification
                if (sensorValue > 25) {
                    if (isMonitoringActive) {
                        sendNotification(sensorValue.toString())
                        isMonitoringActive = false
                    }
                } else {
                    isMonitoringActive = true
                }
            }
        }
        override fun onCancelled(databaseError: DatabaseError) {
            // Handle potential data retrieval errors if needed
        }
    }
    override fun onCreate() {
        super.onCreate()
        isServiceRunning = true
        notificationManager = NotificationManagerCompat.from(this)
        startMonitoringSensorValue()
    }

    override fun onDestroy() {
        super.onDestroy()
        isServiceRunning = false
        stopMonitoringSensorValue()
    }

    override fun onBind(intent: Intent?): IBinder? {
        return null// Return null since this is a started, not a bound service
    }
    // Handler and runnable to periodically check the sensor value
    private val handler = Handler(Looper.getMainLooper())
    private val delayInMillis: Long = 60000

    private val monitorRunnable = object : Runnable {
        override fun run() {
            isMonitoringActive = true
            handler.postDelayed(this, delayInMillis)
        }
    }

    private fun startMonitoringSensorValue() {
        // Start periodic monitoring after the specified delay
        handler.postDelayed(monitorRunnable, delayInMillis)
        monitorSensorValue()
    }

    private fun stopMonitoringSensorValue() {
        handler.removeCallbacks(monitorRunnable)
    }

    private fun monitorSensorValue() {
        // Attach the event listener to the database reference
        sensorRef.addValueEventListener(sensorValueEventListener)
    }

    private fun sendNotification(sensorValue: String) {
        // Build and display the notification when called
        val notificationTitle = "Sensor Value Alert"
        val notificationBody = "Sensor value is above 25: $sensorValue"

        val notificationId = System.currentTimeMillis().toInt() // Change the notification ID if needed

        val notification = NotificationCompat.Builder(this, createNotificationChannel())
            .setSmallIcon(R.drawable.baseline_circle_notifications_24)
            .setContentTitle(notificationTitle)
            .setContentText(notificationBody)
            .setPriority(NotificationCompat.PRIORITY_DEFAULT)
            .build()
        // Check if the app has permission to post notifications
        if (ActivityCompat.checkSelfPermission(
                this,
                Manifest.permission.POST_NOTIFICATIONS
            ) != PackageManager.PERMISSION_GRANTED
        ) {
            return
        }
        notificationManager.notify(notificationId, notification)
    }
    // Create a notification channel for API 26+ devices
    private fun createNotificationChannel(): String {
        val channelId = "SensorMonitoringChannel"
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                channelId,
                "Sensor Monitoring Channel",
                NotificationManager.IMPORTANCE_DEFAULT
            )
            val notificationManager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
            notificationManager.createNotificationChannel(channel)
        }
        return channelId
    }
}
