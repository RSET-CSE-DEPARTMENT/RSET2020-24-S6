#include <ESP8266WiFi.h>  //import ESP8266 WiFi module / NodeMCU package
#include <FirebaseESP8266.h>  //import Firebase Database package
#include <Wire.h>

#define WIFI_SSID "Enter your Hotspot name here"
#define WIFI_PASSWORD "Enter your Hotspot password here"

#define FIREBASE_HOST "paste your Databse connection link here"
#define FIREBASE_AUTH "paste your Firebase Authentication key here"

#define MQ137_PIN A0  //define your analogue pin here 
const int RED_PIN = D0; //define LED red digital pin here 
const int GREEN_PIN = D1; //define LED green digital pin here
const int BLUE_PIN = D2;  //define LED blue digital pin here

const int enA = D3; //define enable A pin of motor driver module here
const int in1 = D4;   //define Logic A pin of motor driver module here

const int enB = D8; //define enable B pin of motor driver module here
const int in4 = D7; //define Logic B pin of motor driver module here
const int in3 = D6; //define Logic B pin of motor driver module here

// Initialize Firebase object
FirebaseData firebaseData;

int i,j,repeat,status=0; //initilaize necessary variables

// Firebase database path
#define FIREBASE_PATH "/sensor_values/mq137"

// Create an instance of the Wi-Fi client
WiFiClient client;

void setup() 
{
  Serial.begin(115200);
  delay(10);

  //The following steps helps your NodeMCU/ESP8266 module to connect with the provided hotspot
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi...");
  while (WiFi.status() != WL_CONNECTED) 
  {
    delay(500);
    Serial.print(".");
  }
  Serial.println();
  Serial.print("Connected to Wi-Fi. IP address: ");
  Serial.println(WiFi.localIP());

  // Initialize Firebase
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);

  // Set maximum retry count and timeout duration
  Firebase.setMaxRetry(firebaseData, 3);
  Firebase.setReadTimeout(firebaseData, 1000);

  //initilize all the pinmode of the componets connected

  //pinmode LED
  pinMode(RED_PIN, OUTPUT);
  pinMode(GREEN_PIN, OUTPUT);
  pinMode(BLUE_PIN, OUTPUT);

  //pin mode FAN
  pinMode(enA, OUTPUT);
  pinMode(in1, OUTPUT);

  //pin mode Aerosole
  pinMode(enB, OUTPUT);
  pinMode(in4, OUTPUT);
  pinMode(in3, OUTPUT);

}

void loop() {
  // Read sensor value
  int sensorValue = analogRead(MQ137_PIN);

  // Convert the value to a voltage
  float voltage = sensorValue * (5.0 / 1023.0);
  float gasConcentration = (voltage * 10.0);
  gasConcentration=gasConcentration-5;
  int x = (int)gasConcentration;

  // Print the sensor value and voltage
  Serial.print("Sensor value: ");
  Serial.println(sensorValue);
  Serial.print("Gas Concentration: ");
  Serial.println(gasConcentration);

  // Save the value to Firebase
  if (Firebase.setFloat(firebaseData, FIREBASE_PATH, gasConcentration)) 
  {
    Serial.println("Value sent to Firebase!");
  } 
  else 
  {
    Serial.println("Failed to send value to Firebase.");
    Serial.println("Reason: " + firebaseData.errorReason());
  }

  //Condition for Exhaust and LED
  if( x < 25 )
  {
    analogWrite(RED_PIN, 0);
    analogWrite(GREEN_PIN, 255);
    analogWrite(BLUE_PIN, 0);

    digitalWrite(in1, LOW);
    delay(100);
  } //if the sensor value less than 25 the LED glow green and Exhaust switch will be open

  if(x > 24 && x < 35 )
  {
    repeat=1;

      analogWrite(RED_PIN, 255);
      analogWrite(GREEN_PIN, 10);
      analogWrite(BLUE_PIN, 50);

      digitalWrite(in1, HIGH);
      analogWrite(enA, 125);
      delay(300000);
      digitalWrite(in1, LOW);
      delay(2000);
      if(status==0)
      {
        status=spray(repeat);
      }
      delay(100);
  } //if the sensor values in between 25 and 34 the LED glow orange and Exhaust switch will be closed for 5 Minutes and sprey aerosol for the number of times repeat value

  status=setTimer();

  if(x > 34)
  {
    repeat=3;

      analogWrite(RED_PIN, 255);
      analogWrite(GREEN_PIN, 0);
      analogWrite(BLUE_PIN, 0);

      digitalWrite(in1, HIGH);
      analogWrite(enA, 255);
      delay(300000);
      digitalWrite(in1, LOW);
      delay(2000);
      if(status==0)
      {
        status=spray(repeat);
      }
      
      delay(100);
  } //if the sensor value is greater than 34 the LED glow red and Exhaust switch will be closed for 5 Minutes and sprey aerosol for the number of times repeat value

  status=setTimer();

  //delay(1000); // Wait for 5 seconds before sending the next value
}

//spray function
int spray(int repeat)
{
  //int s;
  for(j=0;j<repeat;j++)
  {
    //spray using DC motor
    for(i=0;i<=8;i++)
    {
      analogWrite(enB,255);
      digitalWrite(in3, LOW);
      digitalWrite(in4, HIGH);
      delay(14);
    }
    for(i=0;i<=8;i++)
    {
      analogWrite(enB,255);
      digitalWrite(in3, HIGH);
      digitalWrite(in4, LOW);
      delay(14);
    }
    for(i=0;i<=25;i++)
    {
      digitalWrite(in3, LOW);
      digitalWrite(in4, LOW);
      delay(50);
    }
    //wait 15 seconds
    delay(15000);
  }
  return 1;
}

//timer function
int setTimer()
{
  if(status==1)
  {
    delay(60000);
    status=0;
    return status;
  }
  else
  {
    status=0;
    return status;
  }  
}