#include "DHT.h"
#define DHTPIN D1
#define DHTTYPE DHT11
#include <TimeLib.h>
#include <Arduino.h>
#include <Firebase_ESP_Client.h>
#include <ESP8266WiFi.h>
int soil_moisture = A0;
int dryValue = 1023;
int wetValue = 550;
int friendlyDryValue = 0;
int friendlyWetValue = 100;
String timestamp;

DHT dht(DHTPIN, DHTTYPE);

// Provide the token generation process info.
#include "addons/TokenHelper.h"
// Provide the RTDB payload printing info and other helper functions.
#include "addons/RTDBHelper.h"

// Insert your network credentials
#define WIFI_SSID "realme"
#define WIFI_PASSWORD "ashwinsaji"

// Insert Firebase project API Key
#define API_KEY "AIzaSyA-A21Vtjar89jAkdTY8bW-hnkoFOV_dp4"

// Insert RTDB URLefine the RTDB URL */
#define DATABASE_URL "mini-project-microp-default-rtdb.firebaseio.com/" 

// Define Firebase Data object
FirebaseData fbdo;

FirebaseAuth auth;
FirebaseConfig config;

const int MAX_ANALOG_VALUE = 1023;
bool signupOK = false;

void setup()
{
  pinMode(DHTPIN, INPUT);
  pinMode(soil_moisture, INPUT);
  dht.begin();
  Serial.begin(115200);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  /* Assign the API key (required) */
  config.api_key = API_KEY;

  /* Assign the RTDB URL (required) */
  config.database_url = DATABASE_URL;

  /* Sign up */
  if (Firebase.signUp(&config, &auth, "", ""))
  {
    Serial.println("ok");
    signupOK = true;
  }
  else
  {
    Serial.printf("%s\n", config.signer.signupError.message.c_str());
  }

  /* Assign the callback function for the long running token generation task */
  config.token_status_callback = tokenStatusCallback; // see addons/TokenHelper.h

  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);

  configTime(0, 0, "pool.ntp.org");
  while (!time(nullptr)) {
    Serial.print(".");
  }
  Serial.println();
  Serial.println("Time and date initialized.");
}

void loop()
{
  delay(3000);
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  int moisture_value = analogRead(soil_moisture);
  if(moisture_value>=1000)
    moisture_value-=100;
  float moisture_percentage = map(moisture_value , dryValue, wetValue, friendlyDryValue, friendlyWetValue);  

  time_t now = time(nullptr);
  struct tm *timeinfo = localtime(&now);
  char timestampBuffer[20],date[20],time[20];
  sprintf(timestampBuffer, "%04d-%02d-%02d:%02d:%02d:%02d", timeinfo->tm_year + 1900, timeinfo->tm_mon + 1,
          timeinfo->tm_mday, timeinfo->tm_hour+2, timeinfo->tm_min, timeinfo->tm_sec);
  sprintf(date,"%04d-%02d-%02d",timeinfo->tm_year + 1900, timeinfo->tm_mon + 1,timeinfo->tm_mday);
  sprintf(time,"%02d:%02d:%02d",timeinfo->tm_hour+2, timeinfo->tm_min, timeinfo->tm_sec);
  timestamp = String(timestampBuffer);
  if (Firebase.ready() && signupOK)
  {

    // Create a new child node with the timestamp
    String path = "DHT/readings/" + timestamp;
    Firebase.RTDB.setString(&fbdo, path + "/date", date);
    Firebase.RTDB.setString(&fbdo, path + "/time", time);
    // Write humidity value to the database
    if (Firebase.RTDB.setFloat(&fbdo, path + "/humidity", h))
    {
      Serial.print("Humidity: ");
      Serial.println(h);
    }
    else
    {
      Serial.println("FAILED");
      Serial.println("REASON: " + fbdo.errorReason());
    }

    // Write temperature value to the database
    if (Firebase.RTDB.setFloat(&fbdo, path + "/temperature", t))
    {
      Serial.print("Temperature: ");
      Serial.println(t);
    }
    else
    {
      Serial.println("FAILED");
      Serial.println("REASON: " + fbdo.errorReason());
    }

    // Write moisture value to the database
    if (Firebase.RTDB.setFloat(&fbdo, path + "/moisture", moisture_percentage+10))
    {
      Serial.print("Moisture: ");
      Serial.println(moisture_percentage);
    }
    else
    {
      Serial.println("FAILED");
      Serial.println("REASON: " + fbdo.errorReason());
    }
  }
  Serial.println("______________________________");
}