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

r.connect('localhost', port=28015, db='Sensor_data').repl()


r.table('Sensor1TempHumidity').insert({'message':'This has been inserted from the main DAQ server'}).run()

while True:
   
    time.sleep(70)

    
    
    #get temperature in F
    print("Thermocouple 1 is " + str(json.load(urllib2.urlopen("http://10.17.160.120/T1"))))

    print ("Thermocouple 2  is " + str(json.load(urllib2.urlopen("http://10.17.160.120/T2"))))
    
    print ('Thermocouple 3 is ' +  str(json.load(urllib2.urlopen("http://10.17.160.120/T3"))))
    
    print ('Thermocouple 4 is ' +  str(json.load(urllib2.urlopen("http://10.17.160.120/T4"))))

    print ('Ambient Temperature is ' +  str(json.load(urllib2.urlopen("http://10.17.160.120/AmbientTemp"))))

    print ('Light is ' +  str(json.load(urllib2.urlopen("http://10.17.160.120/Light")))) 
