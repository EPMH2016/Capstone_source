import json
import urllib2
import time
import rethinkdb as r
from time import strftime
import datetime
import threading
from threading import Thread
from xml.dom import minidom
from httplib import BadStatusLine

#Attempt to connect to server database
r.connect('localhost', port=28015, db='HDMI').repl()

#Parse through XML configuration file
print "Acquiring time intervals from config.xml"

configdoc = minidom.parse('../xml/config.xml')
DAQlist = configdoc.getElementsByTagName('DAQ')
timeIntervals = {}

#Iterate through configurations for each daq
for daq in DAQlist:
    print "DAQ ID: " + daq.attributes['id'].value
    print "Time Interval: " + daq.attributes['TimeInterval'].value
    timeIntervals[daq.attributes['id'].value] = daq.attributes['TimeInterval'].value

#@name: DAQ1
#@description: Collects data from DAQ1.
def DAQ1():
    r.connect('localhost', port=28015, db='HDMI').repl()

    while True:
        #Get time interval
        time.sleep(float(timeIntervals['DAQ1']))

        #Collect the dataz
        sensorCollect("http://10.17.160.120", "DAQ1", "T1", "DAQ1f", "D1T1", "C")
        sensorCollect("http://10.17.160.120", "DAQ1", "T2", "DAQ1f", "D1T2", "C")
        sensorCollect("http://10.17.160.120", "DAQ1", "T3", "DAQ1f", "D1T3", "C")
        sensorCollect("http://10.17.160.120", "DAQ1", "AmbientTemp", "DAQ1f", "D1AT", "C")
        sensorCollect("http://10.17.160.120", "DAQ1", "Light", "DAQ1f", "D1L", "lux")

#@name: DAQ1=2
#@description: Collects data from DAQ2.
def DAQ2():
    r.connect('localhost', port=28015, db='HDMI').repl()
    while True:

        #Get time interval
        time.sleep(float(timeIntervals['DAQ2']))

        #Collect the dataz
        sensorCollect("http://10.17.176.147", "DAQ2", "T1", "DAQ2f", "D2T1", "C")
        sensorCollect("http://10.17.176.147", "DAQ2", "T2", "DAQ2f", "D2T2", "C")
        sensorCollect("http://10.17.176.147", "DAQ2", "T3", "DAQ2f", "D2T3", "C")
        sensorCollect("http://10.17.176.147", "DAQ2", "AmbientTemp", "DAQ2f", "D2AT", "C")
        sensorCollect("http://10.17.176.147", "DAQ2", "Light", "DAQ2f", "D2L", "lux")

#@name: DAQ3
#@description: Collects data from DAQ3.
def DAQ3():
 	while True:
 		time.sleep(float(timeIntervals['DAQ3']))
 		#print "Collecting data for DAQ3"

#@name: sensorCollect
#@description: Function that collects data from the given DAQ.
def sensorCollect(url, DAQ, sensorType, DAQid, sensorId,  units):
    finalData = "empty"
    try:
        finalData = float(json.load(urllib2.urlopen(url+"/"+sensorType)))
    except (urllib2.URLError,BadStatusLine):
        finalData = float(json.load(urllib2.urlopen(url+"/"+sensorType)))
    if finalData != "empty":
        print DAQ + "-" + sensorType + ":" + " " + str(finalData)
        print "|=====================================|"
        r.table(DAQ).insert({'Sensor Type': sensorType, 'DAQ ID':DAQid, 'Sensor ID': sensorId, 'Data Value': finalData, 'Units': units, 'Timestamp': r.now().in_timezone('-08:00')}).run()


#Collect data in separate threads, each having their own time interval
if __name__ == "__main__":
	Thread(target = DAQ1).start()
	Thread(target=DAQ2).start()
	Thread(target=DAQ3).start()

