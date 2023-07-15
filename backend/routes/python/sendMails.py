from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from base64 import urlsafe_b64encode
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from verify_email import verify_email #TODO
import time
from concurrent.futures import ThreadPoolExecutor
import json


CLIENT_ID = "4424322079-ejm6s550hm5r76v1shsktpag2frir52f.apps.googleusercontent.com"
CLIENT_SECRET = "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"


data = json.loads((input()))
refreshToken, sender, html, emails, totalLength, currentIndex = data.values()

emails = emails.split(',')
totalLength = int(totalLength)
currentIndex = int(currentIndex)

if( totalLength > 450 and (totalLength - currentIndex)>450):
    emails = emails[currentIndex: currentIndex+450]
elif( totalLength > 450 and (totalLength-currentIndex) < 450):
    emails = emails[currentIndex: ]

start = time.perf_counter()

creds = Credentials.from_authorized_user_info({"refresh_token" : refreshToken, "client_id": CLIENT_ID, "client_secret": CLIENT_SECRET} ,scopes = ['https://mail.google.com/'])
service = build('gmail', 'v1', credentials=creds)

# Create a message with HTML content
message = MIMEMultipart()
message['from'] = sender
message['subject'] = "second message"

html_part = MIMEText(html, 'html')
message.attach(html_part)

def send_mail(to):
    if(not verify_email(to)):
        return f"Invalid Email, Not sent to : {to}"
    message.__delitem__('to')
    message['to'] = to
    # Encode the message and convert it to base64 URL-safe format
    raw_message = urlsafe_b64encode(message.as_bytes()).decode('utf-8')
    report = service.users().messages().send(userId='me', body={'raw': raw_message}).execute()
    # print(report , ' to: ', to)
    return [report, f"to :{to}"]

pool = ThreadPoolExecutor(10)
# results = [pool.submit(send_mail, email) for email in emails]
for email in emails:
    print(pool.submit(send_mail, email).result())

stop = time.perf_counter()
print("DONE")
print(f"Process Took {round(stop-start, 2)} Seconds")
