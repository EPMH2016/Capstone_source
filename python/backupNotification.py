import smtplib
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication
from email.mime.multipart import MIMEMultipart
from smtplib import SMTP

#msg = MIMEText('Hello Mr Reed, \n attached is your backup')
msg = MIMEMultipart()
msg['Subject'] = "HDMI Data backup"
msg['From']    = "Yo Momma"
msg['To']      = "olivar16@up.edu"
msg.preamble = "Your data backup"

part = MIMEText("Attached is your data backup")
msg.attach(part)

part = MIMEApplication(open("../php/backup.tar.tgz", "rb").read())
part.add_header('Content-Disposition','attachment',filename="backup.tar.tgz")
msg.attach(part)

#smtp.mailgun.org                                                                                                                                                              
s = smtplib.SMTP('smtp.mailgun.org', 587)

s.login('postmaster@sandbox0343569143484bd0ac8ec34da054003a.mailgun.org', 'epmh2016')

s.sendmail(msg['From'], msg['To'], msg.as_string())
s.quit()