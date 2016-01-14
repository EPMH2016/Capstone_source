
from xml.dom import minidom

#XML file parsing demo

print "Parsing through XML config"

configdoc = minidom.parse('../xml/config.xml')

DAQlist = configdoc.getElementsByTagName('DAQ')
DAQdict = {}


print "length: " + str(len(DAQlist))

#Iterate through configurations for each daq
for daq in DAQlist:
    print "DAQ ID: " + daq.attributes['id'].value
    print "Time Interval: " + daq.attributes['TimeInterval'].value
    DAQdict[daq.attributes['id'].value] = daq.attributes['TimeInterval'].value


