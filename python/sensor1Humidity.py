#!/usr/bin/python

import Adafruit_DHT
import time 
import rethinkdb as r
from time import strftime

print 'The current time is ' + strftime('%H:%M:%S')

# Sensor should be set to Adafruit_DHT.DHT11,
# Adafruit_DHT.DHT22, or Adafruit_DHT.AM2302.
sensor = Adafruit_DHT.DHT22

# Example using a Raspberry Pi with DHT sensor
# connected to GPIO23.
pin = 26

r.connect("localhost", 28015).repl()

while True:

	time.sleep(70)
# Try to grab a sensor reading.  Use the read_retry method which will retry up
# to 15 times to get a sensor reading (waiting 2 seconds between each retry).
	humidity, temperature = Adafruit_DHT.read_retry(sensor, pin)

# Note that sometimes you won't get a reading and
# the results will be null (because Linux can't
# guarantee the timing of calls to read the sensor).  
# If this happens try again!
	if humidity is not None and temperature is not None and (int(strftime('%M'))==30 or int(strftime('%M'))==0):
		
		#if (int(strftime('%M'))/30)==1:
		#	print "At 30 minute mark"
    
		print 'Temp={0:0.1f}*C  Humidity={1:0.1f}%'.format(temperature, humidity)
		print 'Timestamp=' + strftime("%H:%M:%S")
		r.db("Sensor_data").table("Sensor1TemperatureHumidity").insert({"TimeStamp":r.now(), 'Month':r.now().month(), 'Day':r.now().date().day(), 'Year':r.now().year(), "Temperature(C)":temperature, "Humidity":humidity}).run()
#	else:
		#print 'Failed to get reading. Try again!'
