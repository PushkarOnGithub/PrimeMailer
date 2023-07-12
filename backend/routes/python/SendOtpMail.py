from Google import create_service
import base64
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from verify_email import verify_email

CLIENT_SECRET_FILE = "C:\\Users\\pushk\\React Projects\\primemailer\\backend\\routes\\python\\client_secret_contactnetads.json"
API_VERSION = 'v1'
API_NAME = 'gmail'
SCOPES = ['https://mail.google.com/'
  ]

service = create_service(CLIENT_SECRET_FILE, API_NAME, API_VERSION, SCOPES)

OTP = input()
EMAIL = input()
# if(not verify_email(EMAIL)):
if(False):
    print("Invalid Email")
    exit(0)
# print(OTP)
# print(EMAIL)
emailMsg = f"Welcome to PrimeMailer Your OTP to login to PrimeMailer is {OTP} ."
mimeMessage = MIMEMultipart()
mimeMessage['to'] = EMAIL
mimeMessage['subject'] = "Welcome to PrimeMailer"
mimeMessage.attach(MIMEText(emailMsg, 'plain'))


rawString = base64.urlsafe_b64encode(mimeMessage.as_bytes()).decode()

# message = service.users().messages().send(userId='me', body={'raw': rawString}).execute()
message = {'id': True}

try:
    if(message.get('id')):
        print(OTP)
        print("Sent")
        print(f"To {EMAIL}")
except:
    print("OTP not sent")