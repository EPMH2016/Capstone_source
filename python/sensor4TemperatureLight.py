#!/usr/bin/python
 
import spidev
import time
import os
import rethinkdb as r 
from time import strftime 


print 'The current time is ' + strftime('%H:%M:%S')

r.connect("localhost", 28015).repl()

# Open SPI bus
spi = spidev.SpiDev()
spi.open(0,0)
 
# Function to read SPI data from MCP3008 chip
# Channel must be an integer 0-7
def ReadChannel(channel):
  adc = spi.xfer2([1,(8+channel)<<4,0])
  data = ((adc[1]&3) << 8) + adc[2]
  return data
  
# Function to convert data to voltage level,
# rounded to specified number of decimal places.
def ConvertVolts(data,places):
  volts = (data * 3.3) / float(1023)
  volts = round(volts,places)
  return volts
 
# Function to calculate temperature from
# TMP36 data, rounded to specified
# number of decimal places.
def ConvertTemp(data,places):
 
  # ADC Value
  # (approx)  Temp  Volts
  #    0      -50    0.00
  #   78      -25    0.25
  #  155        0    0.50
  #  233       25    0.75
  #  310       50    1.00
  #  465      100    1.50
  #  775      200    2.50
  # 1023      280    3.30
 
  temp = ((data * 330)/float(1023))-50
  temp = round(temp,places)
  return temp
 
# Define sensor channels
light_channel = 0
temp_channel  = 1
 
# Define delay between readings
delay = 70
 
while True:
 
  # Read the light sensor data
  light_level = ReadChannel(light_channel)
  light_volts = ConvertVolts(light_level,2)
 
  # Read the temperature sensor data
  temp_level = ReadChannel(temp_channel)
  temp_volts = ConvertVolts(temp_level,2)
  temp       = ConvertTemp(temp_level,2)
 
 if int(strftime('%M'))==30 or int(strftime('%M'))==0:
   r.db("Sensor_data").table("Sensor4TemperatureLight").insert({"TimeStamp":r.now(), 'Month':r.now().month(), 'Day':r.now().date().day(), 'Year':r.now().year(), "Temperature(C)":temp, "Light":light_level}).run()  
   print "--------------------------------------------"
   print("Light: {} ({}V)".format(light_level,light_volts))
   print("Temp : {} ({}V) {} deg C".format(temp_level,temp_volts,temp))
   #Wait before repeating loop
   time.sleep(delay)
  
 
  
 
  
