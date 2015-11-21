
from xml.dom import minidom

print "Parsing through XML config"

configdoc = minidom.parse('../xml/config.xml')

DAQlist = configdoc.getElementsByTagName('DAQ')

print "length: " + str(len(DAQlist))

#Iterate through configurations for each daq
for daq in DAQlist:
    print "DAQ ID: " + daq.attributes['id'].value
    print "Time Interval: " + daq.attributes['TimeInterval'].value


