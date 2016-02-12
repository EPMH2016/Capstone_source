import json
import urllib2
import time
import rethinkdb as r
from time import strftime
import datetime
import threading
from threading import Thread
from xml.dom import minidomfrom
from httplib import BadStatusLine

#Attempt to connect to server database
r.connect('localhost', port=28015, db='HDMI').repl()


print "Successfully connected to database."

timeInterval = 3

print "Collecting data on time interval: " + str(timeInterval)

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
    r.connect('localhost', port=28015, db='HDMI').repl()

    while True:
        #Get time interval
        time.sleep(float(timeIntervals['DAQ1']))
        print ("DAQ1:")
        # sensorCollect(url, DAQ, sensorType, DAQid, sensorId, units)
        #T1 = float(json.load(urllib2.urlopen("http://10.17.160.120/T1")))
        #T1 = sensorCollect("http://10.17.160.120", "DAQ1", "T1", "DAQ1f", "D1T1", "C")
        sensorCollect("http://10.17.160.120", "DAQ1", "T1", "DAQ1f", "D1T1", "C")
        #print ("T1: " + str(T1))
        #r.table('DAQ1').insert({'Sensor Type': 'T1', 'DAQ ID':'DAQ1f', 'Sensor ID': 'D1T1', 'Data Value': T1, 'Units': 'C', 'Timestamp': r.now().in_timezone('-08:00')}).run()
        
        #T2 = float(json.load(urllib2.urlopen("http://10.17.160.120/T2")))
        #T2 = sensorCollect("http://10.17.160.120", "DAQ1", "T2")
        sensorCollect("http://10.17.160.120", "DAQ1", "T2", "DAQ1f", "D1T2", "C")
        #print "T2: " + str(T2)
        #r.table('DAQ1').insert({'Sensor Type': 'T2', 'DAQ ID':'DAQ1f', 'Sensor ID': 'D1T2', 'Data Value': T2, 'Units': 'C', 'Timestamp': r.now().in_timezone('-08:00')}).run()
        
        #T3 = float(json.load(urllib2.urlopen("http://10.17.160.120/T3")))
        #T3 = sensorCollect("http://10.17.160.120", "DAQ1", "T3")
        #print "T3: " + str(T3)
        sensorCollect("http://10.17.160.120", "DAQ1", "T3", "DAQ1f", "D1T3", "C")
        #r.table('DAQ1').insert({'Sensor Type': 'T3', 'DAQ ID':'DAQ1f', 'Sensor ID': 'D1T3', 'Data Value': T3, 'Units': 'C', 'Timestamp': r.now().in_timezone('-08:00')}).run()
        
        #AmbientTemp = float(json.load(urllib2.urlopen("http://10.17.160.120/AmbientTemp")))
        #AmbientTemp = sensorCollect("http://10.17.160.120", "DAQ1", "AmbientTemp")
        sensorCollect("http://10.17.160.120", "DAQ1", "AmbientTemp", "DAQ1f", "D1AT", "C")
        #print "AmbientTemp: " + str(AmbientTemp)
        #r.table('DAQ1').insert({'Sensor Type': 'AmbientTemp', 'DAQ ID':'DAQ1f', 'Sensor ID': 'D1AT', 'Data Value': AmbientTemp, 'Units': 'C', 'Timestamp': r.now().in_timezone('-08:00')}).run()
        
        #Light = float(json.load(urllib2.urlopen("http://10.17.160.120/Light")))
        #Light = sensorCollect("http://10.17.160.120", "DAQ1", "Light")
        sensorCollect("http://10.17.160.120", "DAQ1", "Light", "DAQ1f", "D1L", "lux")
        #r.table('DAQ1').insert({'Sensor Type': 'Light', 'DAQ ID':'DAQ1f', 'Sensor ID': 'D1L', 'Data Value': Light, 'Units': 'lux', 'Timestamp': r.now().in_timezone('-08:00')}).run()
        #print "Light:" + str(Light)
        print "====================================="

def DAQ2():
    r.connect('localhost', port=28015, db='HDMI').repl()
    while True:

        #Get time interval
        time.sleep(float(timeIntervals['DAQ2']))
        print ("DAQ2:")
        #T1 = float(json.load(urllib2.urlopen("http://10.17.176.147/T1")))
        sensorCollect("http://10.17.176.147", "DAQ2", "T1", "DAQ2f", "D2T1", "C")
       # print ("T1: " + str(T1))
       # r.table('DAQ2').insert({'Sensor Type': 'T1', 'DAQ ID':'DAQ2f', 'Sensor ID': 'D2T1', 'Data Value': T1, 'Units': 'C', 'Timestamp': r.now().in_timezone('-08:00')}).run()
       # T2 = float(json.load(urllib2.urlopen("http://10.17.176.147/T2")))
        sensorCollect("http://10.17.176.147", "DAQ2", "T2", "DAQ2f", "D2T2", "C")
        #print "T2: " + str(T2)
        #r.table('DAQ2').insert({'Sensor Type': 'T2', 'DAQ ID':'DAQ2f', 'Sensor ID': 'D2T1', 'Data Value': T2, 'Units': 'C', 'Timestamp': r.now().in_timezone('-08:00')}).run()
        
        #T3 = float(json.load(urllib2.urlopen("http://10.17.176.147/T3")))
        sensorCollect("http://10.17.176.147", "DAQ2", "T3", "DAQ2f", "D2T3", "C")
        #print "T3: " + str(T3)
        #r.table('DAQ2').insert({'Sensor Type': 'T3', 'DAQ ID':'DAQ2f', 'Sensor ID': 'D2T3', 'Data Value': T3, 'Units': 'C', 'Timestamp': r.now().in_timezone('-08:00')}).run()
        
        #AmbientTemp = float(json.load(urllib2.urlopen("http://10.17.176.147/AmbientTemp")))
        sensorCollect("http://10.17.176.147", "DAQ2", "AmbientTemp", "DAQ2f", "D2AT", "C")
        #print "AmbientTemp: " + str(AmbientTemp)
        #r.table('DAQ2').insert({'Sensor Type': 'AmbientTemp', 'DAQ ID':'DAQ2f', 'Sensor ID': 'D2T1', 'Data Value': AmbientTemp, 'Units': 'C', 'Timestamp': r.now().in_timezone('-08:00')}).run()
        
        #Light = float(json.load(urllib2.urlopen("http://10.17.176.147/Light")))
        sensorCollect("http://10.17.176.147", "DAQ2", "Light", "DAQ2f", "D2L", "lux")
        #r.table('DAQ2').insert({'Sensor Type': 'Light', 'DAQ ID':'DAQ2f', 'Sensor ID': 'D2T1', 'Data Value': Light, 'Units': 'lux', 'Timestamp': r.now().in_timezone('-08:00')}).run()
        #print "Light:" + str(Light)
        print "====================================="

def DAQ3():
 	while True:
 		time.sleep(float(timeIntervals['DAQ3']))
 		#print "Collecting data for DAQ3"

if __name__ == "__main__":
	Thread(target = DAQ1).start()
	Thread(target=DAQ2).start()
	Thread(target=DAQ3).start()

def sensorCollect(url, DAQ, sensorType, DAQid, sensorId,  units):
    finalData = "empty"
    try:
        finalData = float(json.load(urllib2.urlopen(url+"/"+sensorType)))
    except (urllib2.URLError,BadStatusLine):
        finalData = float(json.load(urllib2.urlopen(url+"/"+sensorType)))
    if finalData != "empty":
        print DAQ + "-" + sensorType + ":" + " " + str(finalData)
        r.table(DAQ).insert({'Sensor Type': sensorType, 'DAQ ID':DAQid, 'Sensor ID': sensorId, 'Data Value': finalData, 'Units': units, 'Timestamp': r.now().in_timezone('-08:00')}).run()

    #r.table(DAQ).insert({'Sensor Type': sensorType, 'DAQ ID':'DAQ1f', 'Sensor ID': 'D1T1', 'Data Value': T1, 'Units': 'C', 'Timestamp': r.now().in_timezone('-08:00')}).run()

    

