import smtplib

from email.mime.text import MIMEText

msg = MIMEText('Hello Mr Reed, \n attached is your backup')
msg['Subject'] = "HDMI Data backup"
msg['From']    = "Yo Momma"
msg['To']      = "olivar16@up.edu"

#smtp.mailgun.org                                                                                                                                                              
s = smtplib.SMTP('smtp.mailgun.org', 587)

s.login('postmaster@sandbox0343569143484bd0ac8ec34da054003a.mailgun.org', 'epmh2016')

s.sendmail(msg['From'], msg['To'], msg.as_string())
s.quit()