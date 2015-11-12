import json
import urllib2
import time


# 7 pages:
# 1. T1
# 2. T2
# 3. T3
# 4. T4
# 5. AmbientTemp
# 6. Light
# 7. MACaddress



while True:
   
    #get temperature in F
    print("Temperature(F) is " + str(json.load(urllib2.urlopen("http://192.168.1.18/temp"))))

    print ("Temperature(C) is " + str(json.load(urllib2.urlopen("http://192.168.1.18/temp_c"))))
    
    
