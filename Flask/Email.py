from flask import request
from flask_mail import  Message, Mail
import random, time

user_otp = "None"

def EmailService(endpoints, mail):
    global user_otp
    user_otp = "None"

    @endpoints.route('/sentEmail', methods=['GET','POST'])
    def send_email():
        res = {}
        try:
            req_body = request.get_json()
            if request.method == "POST":
                name = req_body["Name"]
                email=req_body["Email"]
                message = req_body["Message"]
                msg = Message(req_body["Subject"], sender='farmersguide4u@gmail.com',recipients=['ponbalaji486@gmail.com'])
                msg.body = f"Name: {name}\nEmail: {email}\n \nMessage:\n\t{message}"
                mail.send(msg)
        
            status = {
                "statusCode": "200",
                "statusMessage": "Email sent successfully"
            }

        except Exception as e:
            status = {
                "statusCode": "400",
                "statusMessage": str(e)
            }
            
        res['status'] = status
        return res


    @endpoints.route('/get/userOTP', methods=['GET', 'POST'])
    def getUserOTP():
        global user_otp
        res = {}
        try:
            req_body = request.json
            user_otp = str(req_body["OTP"])
            print(user_otp)
            
            status = {
                "statusCode": "200",
                "statusMessage": "OTP recieved successfully"
            }

        except Exception as e:
            print(e)
            status = {
                "statusCode": "400",
                "statusMessage": str(e)
            }
        res['status'] = status
        return res

    return endpoints


#Generate and Sent OTP to user email
def Generate_OTP(mailID):
        global otp
        mail = Mail()
        if request.method == "POST":
            otp = random.randint(1000, 9999)
            msg = Message("Email Verification", sender='farmersguide4u@gmail.com',recipients=[mailID])
            msg.body = f"FarmersGuide\nYour verification OTP is: {otp}\nvalid only 2 minute"
            mail.send(msg)
       

#verify OTP
def verify_OTP():
    global user_otp
    genOTP = str(otp)
    
    #set 2 minutes timeout for OTP
    timeout = time.time() + (2*60) 

    while (user_otp == "None" and time.time() < timeout):
        time.sleep(1)

    if time.time() >= timeout:
        user_otp = "None"
        return "expired"

    print("user "+user_otp)
    print("genrated "+genOTP)

    if (genOTP == user_otp):
        user_otp = "None"
        return "verified"
    
    else:
        user_otp = "None"
        return "failed"



    

