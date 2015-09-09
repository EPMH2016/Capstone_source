import os
import glob
import time
import subprocess
import rethinkdb as r
from time import strftime

print 'The current time is ' + strftime('%H:%M:%S')

r.connect("localhost", 28015).repl()

os.system('modprobe w1-gpio')
os.system('modprobe w1-therm')

base_dir = '/sys/bus/w1/devices/'
device_folder = glob.glob(base_dir + '28*')[0]
device_file = device_folder + '/w1_slave'

def read_temp_raw():
	catdata = subprocess.Popen(['cat',device_file], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
	out,err = catdata.communicate()
	out_decode = out.decode('utf-8')
	lines = out_decode.split('\n')
	return lines

def read_temp():
    lines = read_temp_raw()
    while lines[0].strip()[-3:] != 'YES':
        time.sleep(0.2)
        lines = read_temp_raw()
    equals_pos = lines[1].find('t=')
    if equals_pos != -1 and (int(strftime('%M'))==30 or int(strftime('%M'))==0):
        temp_string = lines[1][equals_pos+2:]
        temp_c = float(temp_string) / 1000.0
        temp_f = temp_c * 9.0 / 5.0 + 32.0
        print 'Timestamp=' + strftime("%H:%M:%S")
		r.db("Sensor_data").table("Sensor2Temperature").insert({"TimeStamp":r.now(), 'Month':r.now().month(), 'Day':r.now().date().day(), 'Year':r.now().year(), "Temperature(C)":temp_c}).run()
        print "Temperature:    {} *C      {} *F".format(temp_c,temp_f)

while True:
	read_temp()	
	time.sleep(70)
