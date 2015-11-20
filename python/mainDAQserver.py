import json
import urllib2
import time
import rethinkdb as r
from time import strftime



# 7 pages:
# 1. T1
# 2. T2
# 3. T3
# 4. T4
# 5. AmbientTemp
# 6. Light
# 7. MACaddress

r.connect('localhost', port=28015, db='HDMI').repl()


r.table('DAQ1').insert({'message':'This has been inserted from the main DAQ server'}).run()

while True:
   
    time.sleep(10)

    
    
    #get temperature in F
    print("Thermocouple 1 is " + str(json.load(urllib2.urlopen("http://10.17.160.120/T1"))))

    T1 = float(json.load(urllib2.urlopen("http://10.17.160.120/T1")))

    print ("Thermocouple 2  is " + str(json.load(urllib2.urlopen("http://10.17.160.120/T2"))))
    
    r.table('DAQ1').insert({'Sensor Type': 'T1', 'DAQ ID':'DAQ1f', 'Sensor ID': 'D1T1', 'Data Value': T1, 'Units': 'C', 'Timestamp': r.now().inTimezone('-09:00')})

    T2 = float(json.load(urllib2.urlopen("http://10.17.160.120/T2")))

    r.table('DAQ1').insert({'Sensor Type': 'T2', 'DAQ ID':'DAQ1f', 'Sensor ID': 'D1T2', 'Data Value': T2, 'Units': 'C', 'Timestamp': r.now().inTimezone('-09:00')})

    print ('Thermocouple 3 is ' +  str(json.load(urllib2.urlopen("http://10.17.160.120/T3"))))

    T3 = float(json.load(urllib2.urlopen("http://10.17.160.120/T3")))
    
    r.table('DAQ1').insert({'Sensor Type': 'T3', 'DAQ ID':'DAQ1f', 'Sensor ID': 'D1T3', 'Data Value': T3, 'Units': 'C', 'Timestamp': r.now().inTimezone('-09:00')})

    print ('Thermocouple 4 is ' +  str(json.load(urllib2.urlopen("http://10.17.160.120/T4"))))

    T4 = float(json.load(urllib2.urlopen("http://10.17.160.120/T4")))

    r.table('DAQ1').insert({'Sensor Type': 'T4', 'DAQ ID':'DAQ1f', 'Sensor ID': 'D1T4', 'Data Value': T4, 'Units': 'C', 'Timestamp': r.now().inTimezone('-09:00')})

    print ('Ambient Temperature is ' +  str(json.load(urllib2.urlopen("http://10.17.160.120/AmbientTemp"))))

    AmbientTemp = float(json.load(urllib2.urlopen("http://10.17.160.120/AmbientTemp")))

    r.table('DAQ1').insert({'Sensor Type': 'AmbientTemp', 'DAQ ID':'DAQ1f', 'Sensor ID': 'D1AT', 'Data Value': AmbientTemp, 'Units': 'C', 'Timestamp': r.now().inTimezone('-09:00')})

    print ('Light is ' +  str(json.load(urllib2.urlopen("http://10.17.160.120/Light")))) 

    Light = float(json.load(urllib2.urlopen("http://10.17.160.120/Light")))

    r.table('DAQ1').insert({'Sensor Type': 'Light', 'DAQ ID':'DAQ1f', 'Sensor ID': 'D1L', 'Data Value': Light, 'Units': 'lux', 'Timestamp': r.now().inTimezone('-09:00')})

