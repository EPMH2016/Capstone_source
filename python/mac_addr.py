import subprocess
from subprocess import PIPE, Popen

def get_ip_from_mac(mac_addr_str):
    process = Popen(["arp", "-a"], stdout=PIPE, stderr=PIPE)
    out, err = process.communicate()
    
    out_list = out.split()
    
    # counter to keep track of where we are in out_list
    i = 0
    for string in out_list:
        # check if mac address matches one of the strings
        if(mac_addr_str == string):
            # the ip address is two strings before the mac address in out_list
            # return ip address (need to strip off parenthesis on either side of ip address)
            return out_list[i-2][1:len(out_list[i-2])-1]
            
        i += 1
        
    # could not match mac address, return failed    
    return "failed"
    
    
print get_ip_from_mac("00:09:7c:d6:3d:81")



#8c:60:4f:5c:d5:41

 