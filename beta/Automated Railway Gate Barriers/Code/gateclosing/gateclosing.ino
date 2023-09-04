#include <LiquidCrystal.h>  // includes the LiquidCrystal Library
#include <Servo.h>
#define led1 12
#define led2 13
LiquidCrystal lcd(3, 8, 4, 5, 6, 7);  // Creates an LCD object. Parameters: (rs, enable, d4, d5, d6, d7)
Servo gate;
int sec;
String sente;
int newval;
const int trigPin = 10;
const int echoPin = 11;
float duration, distance;
void setup() {
  sec = -1;
  Serial.begin(115200);
  lcd.begin(16, 2);  // Initializes the interface to the LCD screen, and specifies the dimensions (width and height) of the display }
  gate.attach(2);
  gate.write(90);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  for (int i = 12; i <= 13; i++) {
    pinMode(i, OUTPUT);
    digitalWrite(i, LOW);
  }
  lcd.print("CLOSING GATE IN:");  //Closing gate text
  digitalWrite(led1, HIGH);
}
void beeper()  //buzzer sound
{
  tone(9, 2000);
  delay(200);
  noTone(9);
}
void alternate()  //alternate blinking
{
  if (digitalRead(led1) == HIGH) {
    digitalWrite(13, HIGH);
    digitalWrite(12, LOW);
  } else if (digitalRead(led2) == HIGH) {
    digitalWrite(12, HIGH);
    digitalWrite(13, LOW);
  }
}
void gateclosing() {
  for (int i = gate.read() + 1; i <= 180; i++) {
    digitalWrite(trigPin, LOW);
    delayMicroseconds(2);
    digitalWrite(trigPin, HIGH);
    delayMicroseconds(10);
    digitalWrite(trigPin, LOW);
    duration = pulseIn(echoPin, HIGH);
    distance = (duration * .0343) / 2;
    if (distance > 100) {
      gate.write(i);
      delay(50);
    } else
      i--;
  }
}
void gateopening() {
  for (int i = gate.read() + 1; i >= 90; i--) {
    gate.write(i);
    delay(50);
  }
}
void loop() {
  if (sec==5) {
    alternate();
    lcd.noBlink();   // Turns off the blinking LCD cursor
    lcd.noCursor();  // Hides the LCD cursor
    beeper();
    delay(200);
    alternate();
    lcd.clear();
    lcd.print("CLOSING GATE IN:");
    lcd.setCursor(7, 1);
    lcd.print(sec);
    sec--;
    delay(200);
    alternate();
    beeper();
    delay(200);
  }
  if (sec == 0) {
    delay(500);
    digitalWrite(12, HIGH);
    digitalWrite(13, HIGH);
    lcd.clear();
    lcd.setCursor(2, 0);
    lcd.print("GATE CLOSING");
    tone(9, 1000);
    //gateclosing();
    noTone(9);
    Serial.println("DONE");
    lcd.clear();
    sec = -1;
  }
  if (sec == -1) {
    serial.flush();
    while (Serial.available() == 0) {}
    sente = Serial.readString();
    sente.trim();
    lcd.clear();
    lcd.setCursor(7, 1);
    lcd.print(sec);
    delay(7000);
  }
}