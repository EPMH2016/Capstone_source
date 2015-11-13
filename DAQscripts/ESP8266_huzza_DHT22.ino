//browse to its ip to see the data
#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include "DHT.h"

#define DHTPIN 5
#define DHTTYPE DHT22  // change to DHT11 if that's what you have
 
#define SSID "TheArmory"
#define PASS "pilots2016"

uint8_t MAC_array[6];
char MAC_char[18];

ESP8266WebServer server(80);
 
DHT dht(DHTPIN, DHTTYPE, 15);

float humidity, temp_c, temp_f;
 
void setup() {
  Serial.begin(115200);
  delay(10);
 
  // Connecting to wifi
  WiFi.begin(SSID,PASS);

//  IPAddress ip(192, 168, 1, 55);
//  IPAddress gateway(192, 168, 1, 1);
//  IPAddress subnet(255, 255, 255, 0);
//  WiFi.config(ip, gateway, subnet);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  
  WiFi.macAddress(MAC_array);
  for (int i = 0; i < sizeof(MAC_array); ++i){
      sprintf(MAC_char,"%s%02x:",MAC_char,MAC_array[i]);
   }
 
  Serial.println("");
  Serial.print("Connected to ");
  Serial.print(SSID);
  Serial.print(" with IP ");  
  Serial.println(WiFi.localIP());

  // Define capabilities of our little web server
  server.on("/", handle_root);
  
  server.on("/T1", [](){
    ReadSensor();
    server.send(200, "text/plain", String(temp_f));
  });

    server.on("/T2", [](){
    ReadSensor();
    server.send(200, "text/plain", String(temp_f+10));
  });

    server.on("/T3", [](){
    ReadSensor();
    server.send(200, "text/plain", String(temp_f+20));
  });
  
  server.on("/T4", [](){
    ReadSensor();
    server.send(200, "text/plain", String(temp_f+30));
  });
 
  server.on("/AmbientTemp", [](){
    ReadSensor();
    server.send(200, "text/plain", String(humidity));
  });

    server.on("/Light", [](){
    ReadSensor();
    server.send(200, "text/plain", String(temp_c));
  });

   server.on("/MACaddr", [](){
    ReadSensor();
    server.send(200, "text/plain", String(MAC_char));
  });
  
  server.begin();
  Serial.println("HTTP server started");

  dht.begin();
}

void handle_root() {
  server.send(200, "text/plain", "Connected. Read data from /T1   /T2    /T3    /T4    /AmbientTemp    /Light    /MACaddr");
  delay(100);
}

void loop() {
  server.handleClient();
}

void ReadSensor() {
  humidity = dht.readHumidity();
  temp_c = dht.readTemperature();
  temp_f = dht.readTemperature(true);

  // Check if any reads failed and exit early (to try again).
  if (isnan(humidity) || isnan(temp_c) || isnan(temp_f)) {
    Serial.println("Failed to read from DHT sensor :-(");
    return;
  }

}
