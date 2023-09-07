#include <AltSoftSerial.h>
#include <TinyGPS++.h>

#include <SoftwareSerial.h>
#include <math.h>

#include<Wire.h>

const String EMERGENCY_PHONE = "INSERT EMERGENCY CONTACT NUMBER";
//SoftwareSerial nodemcuSerial(D2,D1)
//GPS Module RX pin to Arduino 9
//GPS Module TX pin to Arduino 8
AltSoftSerial neogps;
TinyGPSPlus gps;

String sms_status,sender_number,received_date,msg;
String latitude, longitude;
char timestamp_str[12];


#define xPin A1
#define yPin A2
#define zPin A3


byte updateflag;

int xaxis = 0, yaxis = 0, zaxis = 0;
int deltx = 0, delty = 0, deltz = 0;
int vibration = 2, devibrate = 75;
int magnitude = 0;
int sensitivity = 20;
double angle;
boolean impact_detected = false;
//Used to run impact routine every 2mS.
unsigned long time1;
unsigned long impact_time;




/*****************************************************************************************
 * setup() function
 *****************************************************************************************/
void setup()
{
  Serial.begin(9600);
  neogps.begin(9600);
  
  
  time1 = micros(); 
  
  xaxis = analogRead(xPin);
  yaxis = analogRead(yPin);
  zaxis = analogRead(zPin);

  

}





/*****************************************************************************************
 * loop() function
 *****************************************************************************************/
void loop()
{
  //--------------------------------------------------------------
  //call impact routine every 2mS
  if (micros() - time1 > 1999) Impact();
  //--------------------------------------------------------------
  if(updateflag > 0) 
  {
    updateflag=0;
   

    getGps(magnitude);
    impact_detected = true;
    impact_time = millis();
  }
}





/*****************************************************************************************
 * Impact() function
 *****************************************************************************************/
void Impact()
{
  time1 = micros(); 
  int oldx = xaxis; 
  int oldy = yaxis;
  int oldz = zaxis;

  xaxis = analogRead(xPin);
  yaxis = analogRead(yPin);
  zaxis = analogRead(zPin);
  
  vibration--; 
  //Serial.print("Vibration = "); Serial.println(vibration);
  if(vibration < 0) vibration = 0;                                
  //Serial.println("Vibration Reset!");
  
  if(vibration > 0) return;
  //--------------------------------------------------------------
  deltx = xaxis - oldx;                                           
  delty = yaxis - oldy;
  deltz = zaxis - oldz;
  
  //Magnitude to calculate force of impact.
  magnitude = sqrt(sq(deltx) + sq(delty) + sq(deltz));
  if (magnitude >= sensitivity) //impact detected
  {
    updateflag=1;
    // reset anti-vibration counter
    vibration = devibrate;
  }
  
  else
  {
    //if (magnitude > 15)
      //Serial.println(magnitude);
    //reset magnitude of impact to 0
    magnitude=0;
  }

}




/*****************************************************************************************
 * getGps() Function
*****************************************************************************************/
void getGps(int magnitude)
{
  // Can take up to 60 seconds
  boolean newData = false;
  for (unsigned long start = millis(); millis() - start < 2000;){
    while (neogps.available()){
      if (gps.encode(neogps.read())){
        newData = true;
        break;
      }
    }
  }
  
  if (newData) //If newData is true
  {
    latitude = String(gps.location.lat(), 6);
    longitude = String(gps.location.lng(), 6);
    newData = false;
     // Buffer to hold the timestamp string (HH:mm:ss)
    sprintf(timestamp_str, "%02d:%02d:%02d", (gps.time.hour()+ 5)%24, (gps.time.minute()+30)%60, gps.time.second());
    //Serial.println(gps.time.hour());
    //Serial.println(gps.time.minute());
    //Serial.println(gps.time.second());
    //Serial.print("GPS Timestamp: ");
  }
  else {
    //Serial.println("No GPS data is available");
    latitude = "";
    longitude = "";
  }
  String mag = String(magnitude); 
  //Serial.print("Latitude= ");
  //nodemcuSerial.println(mag); 
  Serial.print(mag);
  Serial.print("\t");
  Serial.print(latitude);
  Serial.print("\t");
  //Serial.print("Lngitude= "); 
  Serial.print(longitude);
  Serial.print("\t");
  Serial.print(EMERGENCY_PHONE);
  Serial.print("\t");
  Serial.println(timestamp_str);
  
}    
