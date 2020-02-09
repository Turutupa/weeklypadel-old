# sys.path.append('/home/turutupa/Documents/weeklypadel/config')
import smtplib
import sys
sys.path.append('../config')
from config import *
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from termcolor import colored


class GameReminder:
    def __init__(self):
        pass

    def send_email(to_list, game_name, date):
        try:
            server = smtplib.SMTP('smtp.gmail.com:587')
            server.ehlo()
            server.starttls()
            server.login(EMAIL_ADDRESS, PASSWORD)
            for to in to_list:
                message = MIMEMultipart('alternative')
                message['Subject'] = subject
                message['From'] = EMAIL_ADDRESS
                message['To'] = to['email']
                name = to.rsplit('@')[0].upper()
                html = """
              <html>
                <body>
                  <p>Hi, how are you <strong style="color:pink">{}?</strong></p>
                    <p>
                    <a href="http://www.realpython.com">Real Python</a> 
                    has many great tutorials.
                  </p>
                </body>
              </html>
              """.format(name)

                # part1 = MIMEText(text, 'plain')
                html_mime = MIMEText(html, 'html')
                # message.attach(part1)
                message.attach(html_mime)

                server.sendmail(EMAIL_ADDRESS, to, message.as_string())
            server.quit()
            print(colored("[SUCCESS] Email sent!", 'green'))
        except Exception:
            print(colored("[ERROR] Email failed to send", 'red'))


# to_list = [
#   {
#     'email': 'adc.batros@gmail.com,
#     'id': '1301234091234'
#   },
#   {
#     'email': 'random@gmail.com',
#     'id': '10234091810934'
#   }
# ]
subject = "[PRIVATE] Weekly Attendance Check"
to_list = ['weekly.padel@gmail.com']

send_email(subject, to_list)
