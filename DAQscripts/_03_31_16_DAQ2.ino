#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include "Adafruit_TSL2591.h"
#include <OneWire.h>
#include <DallasTemperature.h>
#include <SPI.h>
#include "Adafruit_HTU21DF.h"
#include "EmonLib.h"  

uint8_t MAC_array[6];
char MAC_char[18];

#define WLAN_SSID "UPStudent"
#define WLAN_PASS ""
ESP8266WebServer server(80);
 
Adafruit_TSL2591 tsl = Adafruit_TSL2591(2591);    
uint16_t lux, ir, full;
uint32_t lum;

#define ONE_WIRE_BUS 13                           
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

double temp_c;

// Assign the address of 1-wire temp sensors
DeviceAddress Temp1 = { 0x3B, 0xDE, 0x17, 0x19, 0x00, 0x00, 0x00, 0xF3}; //Thermocouple 1
DeviceAddress Temp2 = { 0x3B, 0xEA, 0x17, 0x19, 0x00, 0x00, 0x00, 0xC2}; //Thermocouple 2
DeviceAddress Temp3 = { 0x3B, 0xEC, 0x17, 0x19, 0x00, 0x00, 0x00, 0x70}; //Thermocouple 3
DeviceAddress Temp4 = { 0x28, 0x4B, 0x0F, 0x13, 0x07, 0x00, 0x00, 0x36}; //Ambient Temp

Adafruit_HTU21DF htu = Adafruit_HTU21DF();

EnergyMonitor current1; 

void setup() {
  Wire.begin(5,4);      //SDA 5 , SCL 4
  Serial.begin(115200);
  delay(10);
  
  sensors.begin();
  sensors.setResolution(Temp1, 10);
  sensors.setResolution(Temp2, 10);
  sensors.setResolution(Temp3, 10);
  sensors.setResolution(Temp4, 10);
  
  WiFi.begin(WLAN_SSID, WLAN_PASS);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
 
  Serial.println("");
  Serial.print("Connected to wifi with IP ");  
  Serial.println(WiFi.localIP());

  WiFi.macAddress(MAC_array);
    for (int i = 0; i < sizeof(MAC_array); ++i){
      sprintf(MAC_char,"%s%02x:",MAC_char,MAC_array[i]);
    }  
  Serial.println(MAC_char);

  server.on("/", handle_root);
  
  server.on("/T1", [](){
  sensors.requestTemperatures();
  server.send(200, "text/plain", String(sensors.getTempC(Temp1)));
  });

  server.on("/T2", [](){
  sensors.requestTemperatures();
  server.send(200, "text/plain", String(sensors.getTempC(Temp2)));
  });

  server.on("/T3", [](){
  sensors.requestTemperatures();
  server.send(200, "text/plain", String(sensors.getTempC(Temp3)));
  });

  server.on("/AmbientTemp", [](){
  sensors.requestTemperatures();
  server.send(200, "text/plain", String(sensors.getTempC(Temp4)-2));
  });

  server.on("/Humidity", [](){
  server.send(200, "text/plain", String(htu.readHumidity()));
  });

//  current1.current(A0, 127);
//  server.on("/Current", [](){
//  server.send(200, "text/plain", String(current1.calcIrms(1480)));
//  });

  server.on("/Light", [](){
  light();
  while (lux>88000 || lux <0) {
    light();
  }
  server.send(200, "text/plain", String(lux));
  });
  
  server.begin();
  Serial.println("DAQ 2 HTTP server started");

}

void loop() {
  server.handleClient(); 
//  sensors.requestTemperatures();
//  Serial.println(sensors.getTempC(Temp1));
//  Serial.println(sensors.getTempC(Temp2));
//  Serial.println(sensors.getTempC(Temp3));
//  Serial.println(sensors.getTempC(Temp4));
//  light();
//  Serial.println(lux);
//  Serial.println(htu.readHumidity());
//  Serial.println(current1.calcIrms(1480));
//  Serial.println("");
//  Serial.println("");
}

void handle_root() {
  server.send(200, "text/plain", "All systems go. Read data on DAQ2 from /T1 or /T2 or /T3 or /T4 or /AmbientTemp or /Light or /Humidity");
  delay(10);
}

void light(void) {
  lum = tsl.getFullLuminosity();
  ir = lum >> 16;
  full = lum & 0xFFFF;
  lux = tsl.calculateLux(full, ir);
}






