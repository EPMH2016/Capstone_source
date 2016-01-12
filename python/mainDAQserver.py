import json
import urllib2
import time
import rethinkdb as r
from time import strftime
import datetime
import threading
from threading import Thread
from xml.dom import minidom

#Attempt to connect to server database
r.connect('localhost', port=28015, db='HDMI').repl()


#Parse through XML configuration file
print "Parsing through XML config"

configdoc = minidom.parse('../xml/config.xml')
DAQlist = configdoc.getElementsByTagName('DAQ')
timeIntervals = {}


print "length: " + str(len(DAQlist))

#Iterate through configurations for each daq
for daq in DAQlist:
    print "DAQ ID: " + daq.attributes['id'].value
    print "Time Interval: " + daq.attributes['TimeInterval'].value
    timeIntervals[daq.attributes['id'].value] = daq.attributes['TimeInterval'].value


#ENSURE THAT EACH DAQ IN config.xml has a function
def DAQ1():
	while True:
		#Get time interval
		time.sleep(timeIntervals['DAQ1'])
		print ("Collecting data for DAQ1")
    	T1 = float(json.load(urllib2.urlopen("http://10.17.160.120/T1")))
    	r.table('DAQ1').insert({'Sensor Type': 'T1', 'DAQ ID':'DAQ1f', 'Sensor ID': 'D1T1', 'Data Value': T1, 'Units': 'C', 'Timestamp': r.now().in_timezone('-08:00')}).run()
    	T2 = float(json.load(urllib2.urlopen("http://10.17.160.120/T2")))
    	r.table('DAQ1').insert({'Sensor Type': 'T2', 'DAQ ID':'DAQ1f', 'Sensor ID': 'D1T2', 'Data Value': T2, 'Units': 'C', 'Timestamp': r.now().in_timezone('-08:00')}).run()
    	T3 = float(json.load(urllib2.urlopen("http://10.17.160.120/T3")))
    	r.table('DAQ1').insert({'Sensor Type': 'T3', 'DAQ ID':'DAQ1f', 'Sensor ID': 'D1T3', 'Data Value': T3, 'Units': 'C', 'Timestamp': r.now().in_timezone('-08:00')}).run()
    	T4 = float(json.load(urllib2.urlopen("http://10.17.160.120/T4")))
    	r.table('DAQ1').insert({'Sensor Type': 'T4', 'DAQ ID':'DAQ1f', 'Sensor ID': 'D1T4', 'Data Value': T4, 'Units': 'C', 'Timestamp': r.now().in_timezone('-08:00')}).run()
    	AmbientTemp = float(json.load(urllib2.urlopen("http://10.17.160.120/AmbientTemp")))
    	r.table('DAQ1').insert({'Sensor Type': 'AmbientTemp', 'DAQ ID':'DAQ1f', 'Sensor ID': 'D1AT', 'Data Value': AmbientTemp, 'Units': 'C', 'Timestamp': r.now().in_timezone('-08:00')}).run()
    	Light = float(json.load(urllib2.urlopen("http://10.17.160.120/Light")))

def DAQ2():
	while True:
		time.sleep(timeIntervals['DAQ2'])
		print "Collecting data for DAQ2"

def DAQ3():
	while True:
		time.sleep(timeIntervals['DAQ3'])
		print "Collecting data for DAQ3"

if __name__ == "main":
	Thread(target = DAQ1).start()
	Thread(target=DAQ2).start()
	Thread(target=DAQ3).start()