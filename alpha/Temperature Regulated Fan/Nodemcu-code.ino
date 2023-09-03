  #include <ESP8266WiFi.h>
  #include <Wire.h>
  #include <DHT11.h>
  #include <NTPClient.h>
  #include <WiFiUdp.h>
  #include <TimeLib.h>
  #include <Arduino.h>
  #include <Firebase_ESP_Client.h>
  #include <LiquidCrystal_I2C.h>
  #include <ESP8266WebServer.h> //
  #include <WiFiClient.h>  //
  String timestamp;
  int pwm_value=0;
  bool flag = false; // Flag variable

  LiquidCrystal_I2C lcd(0x27, 16, 2);  

  // Provide the token generation process info.
  #include "addons/TokenHelper.h"
  // Provide the RTDB payload printing info and other helper functions.
  #include "addons/RTDBHelper.h"

  ESP8266WebServer server(80);

  #define WIFI_SSID "realme GT 2"
  #define WIFI_PASSWORD "12345678"

  // Insert Firebase project API Key
  #define API_KEY "AIzaSyAIHizGPzxfkuXvK8xPmMAakwc4n4rN8yE"

  // Insert RTDB URLefine the RTDB URL */
  #define DATABASE_URL "https://fan-control-8ba6a-default-rtdb.firebaseio.com/" 

  // Define Firebase Data object
  FirebaseData fbdo;

  FirebaseAuth auth;
  FirebaseConfig config;

  bool signupOK = false;

  WiFiClient client;

  WiFiUDP ntpUDP;
  NTPClient timeClient(ntpUDP, "pool.ntp.org");


  DHT11 dht11(D3);
  #define pwm D5


  void setup() {
    
    lcd.init();   // initializing the LCD
    lcd.backlight(); // Enable or Turn On the backlight 
    Serial.begin(115200);
    delay(10);
    pinMode(pwm, OUTPUT);

    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    Serial.print("Connecting to Wi-Fi...");

    while (WiFi.status() != WL_CONNECTED) {
      delay(500);
      Serial.print(".");

    }
    Serial.println();
    Serial.print("Connected to Wi-Fi. IP address: ");
    Serial.println(WiFi.localIP());

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
      delay(1000);
    }
    Serial.println();
    Serial.println("Time and date initialized.");

    server.on("/slider", handleSliderValue);

    server.begin();
    Serial.println("HTTP server started");
  }


  void handleSliderValue() {
    if (server.hasArg("value") && server.hasArg("value2")) {
      String value = server.arg("value");
      pwm_value = value.toInt();   //slider value
      int value2 = server.arg("value2").toInt(); // manual mode =11 / automatic mode=22
      // Do something with the slider value
      // For example, print it to the serial monitor
      Serial.print("Slider value: ");
      Serial.println(pwm_value);

      // Check the value of value2
      if (value2 == 22) {
        // Set the flag to true
        Serial.print("value=22");
        lcd.clear();
        Serial.print("Automatic mode\n");
        lcd.print("Automatic Mode");
        flag = true;
      }
      else
      flag= false;
      delay(200);
    }
  }

  void loop() {

    int temp = dht11.readTemperature();  // Read temperature value in Celsius
    Serial.print("Temperature: ");
    Serial.print(temp);
    Serial.println("°C");
   

    if (flag) {
    // Execute code if the flag is true (value2 is 22)
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("Automatic Mode");
      lcd.setCursor(0, 0);
      lcd.print("Temperature:");
      lcd.print(temp);
      Serial.print("Automatic Mode");
      lcd.setCursor(0, 1);
      if (temp < 25)
      {
        pwm_value = 0;
        analogWrite(9, 0);
        lcd.print("Fan OFF            ");
        delay(100);
      }

      else if (temp == 25)
      {
        pwm_value = 55;
        analogWrite(pwm, 55);
        lcd.print("Fan Speed: 20%   ");
        delay(100);

      }

      else if (temp == 26)
      {
        pwm_value = 110;
        analogWrite(pwm, 110);
        lcd.print("Fan Speed: 40%   ");
        delay(100);
      }

      else if (temp == 27)
      {
        pwm_value = 165;
        analogWrite(pwm, 255);
        lcd.print("Fan Speed: 100%   ");
        delay(100);
      }
      else if (temp == 31)
      {
        pwm_value = 165;
        analogWrite(pwm, 200);
        lcd.print("Fan Speed: 80%   ");
        delay(100);
      }

      else if (temp > 28)

      {
        pwm_value = 255;
        lcd.print("Fan Speed: 100%    ");
        analogWrite(pwm, 255);
        delay(100);
      }
  }
   else {
    // Execute code if the flag is false (value2 is not 22)
       lcd.setCursor(0, 0);
       lcd.clear();
       lcd.print("Manual Mode");
       lcd.setCursor(0, 1);
       lcd.print("PWM:");
       lcd.print(pwm_value);
       Serial.print("Manual Mode\n");
       analogWrite(pwm, pwm_value);
  }
   

    time_t now = time(nullptr);                   //read time and date from web
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

      // Write pwm_value value to the database
      if (Firebase.RTDB.setFloat(&fbdo, path + "/PWM", pwm_value))
      {
        Serial.print("\nPWM: ");
        Serial.println(pwm_value);
      }
      else
      {
        Serial.println("FAILED");
        Serial.println("REASON: " + fbdo.errorReason());
      }

      // Write temperature value to the database
      if (Firebase.RTDB.setFloat(&fbdo, path + "/temperature", temp))
      {
        Serial.print("Temperature: ");
        Serial.println(temp);
      }
      else
      {
        Serial.println("FAILED");
        Serial.println("REASON: " + fbdo.errorReason());
      }
    }
    server.handleClient();
  }


  
