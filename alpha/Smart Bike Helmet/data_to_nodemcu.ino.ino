#include <ArduinoJson.h>

#include <SoftwareSerial.h>
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>


SoftwareSerial arduinoSerial(D2, D1); // RX, TX pins

const char* ssid = "insert mobile hotspot name";
const char* password = "hotspot password";
String data;

ESP8266WebServer server(80);

void setup() {
  Serial.begin(9600);
  arduinoSerial.begin(9600);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("WiFi connected");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  server.on("/data", handleDataRequest);  // Data endpoint route
  server.begin();
}

  void loop() {
  if (arduinoSerial.available()) {
     data = arduinoSerial.readString();
    Serial.println(data);
    server.handleClient();
    server.handleClient();
  }

  }

  void handleDataRequest() {
 
  
  DynamicJsonDocument doc(256);
  doc["crash_data"] = data;
  String jsonData;
  serializeJson(doc, jsonData); 
  server.send(200, "application/json", jsonData);
  Serial.println(jsonData);
}
