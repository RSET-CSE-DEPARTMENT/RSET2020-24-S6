#include<dht.h>
dht DHT;
int trig= 7;
int echo= 6;
int timeInMicro;
int distInCm;
#define DHT11_PIN 10

float temperature;

void setup() {
  Serial.begin(9600);
  pinMode(7,OUTPUT);
  pinMode(6,INPUT);
}

void loop() {
      digitalWrite(trig,LOW);
      delayMicroseconds(2);
      digitalWrite(trig,HIGH);
      delayMicroseconds(10);
      digitalWrite(trig,LOW);

      timeInMicro=pulseIn(echo,HIGH);

      distInCm=timeInMicro/29/2;

      Serial.print("Distance: ");
      Serial.println(distInCm);
      
     // Read temperature sensor value
      int chk=DHT.read11(DHT11_PIN);
     temperature = DHT.temperature;
      Serial.print("Temperature: ");
      Serial.print(temperature);
      Serial.println(" C");
  
  delay(2000);
}