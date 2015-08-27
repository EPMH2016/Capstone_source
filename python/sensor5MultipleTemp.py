import os
import glob
import time
import subprocess

os.system('modprobe w1-gpio')
os.system('modprobe w1-therm')

sensorID= ["28-031502f05eff", "28-0315030b03ff", "28-0315517803ff"]
avgtemp = []
for sensor in range(len(sensorID)):
    temp = []
    for polltime in range(0,3):
	text = '';
	while text.split("\n")[0].find("YES") == -1:
	    tfile = open("/sys/bus/w1/devices/"+ sensorID[sensor] +"/w1_slave")
	    text = tfile.read()
    	    tfile.close()
	    time.sleep(1)
 
	    secondline = text.split("\n")[1]
	    tempData = secondline.split(" ")[9]
	    tempC = float(tempData[2:])
	    temp.append(tempC / 1000)
while True:
	avgtemp.append(sum(temp) / float(len(temp)))
	print avgtemp
print avgtemp[sensor]

