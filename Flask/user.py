from flask_pymongo import pymongo
from flask import request, jsonify
from bson import ObjectId
from Email import Generate_OTP
import os
from dotenv import load_dotenv
load_dotenv()

#Connect MongoDB
con_string = os.getenv("MONGO_URI")
client = pymongo.MongoClient(con_string)

db = client.get_database('userDatabase')
user_collection = pymongo.collection.Collection(db, 'userDetails')
print("...........................MongoDB connected Successfully.........................")

def userData(endpoints):
    #Create user account
    @endpoints.route('/create/account', methods=['GET', 'POST'])
    def createUser():
        global user_data, otp
        res = {}
        try:
            #Get user email
            req_body = request.json
            user_data=req_body

            #Check Email already exists
            user = user_collection.find_one({'Email': req_body["Email"]})
            if user:
                status = {
                    "statusCode": "200",
                    "statusMessage": "Email already exists"
                }

            else:
                
                #call Generate_OTP function to generate and sent OTP to the user email
                otp = Generate_OTP(user_data["Email"])
                print("OTP generated - "+str(otp))

                status = {
                    "statusCode": "200",
                    "statusMessage": "new Email"
                }

        except Exception as e:
            status = {
                "statusCode": "400",
                "statusMessage": str(e)
            }

        res['status'] = status
        return res
    
    @endpoints.route('/resend/otp', methods=['GET', 'POST'])
    def resendOTP():
        global otp
        res = {}
        try:
            otp = Generate_OTP(user_data["Email"])
            status = {
                    "statusCode": "200",
                    "statusMessage": "OTP sent successfully"
                }
        except Exception as e:
            print(e)
            status = {
                "statusCode": "400",
                "statusMessage": str(e)
            }
        res['status'] = status
        return res
    
    @endpoints.route('/verify/account', methods=['GET', 'POST'])
    def verifyAccount():
        res = {}
        try:
            req_body = request.json
            user_otp = str(req_body["OTP"])
            print(user_otp)
            
            if (otp == user_otp):
                user_collection.insert_one(user_data)
                status = {
                    "statusCode": "200",
                    "statusMessage": "User data created successfully in database"
                }

            elif (otp == user_otp):
                status = {
                    "statusCode": "400",
                    "statusMessage": "Email verification failed"
                }

        except Exception as e:
            print(e)
            status = {
                "statusCode": "400",
                "statusMessage": str(e)
            }
        res['status'] = status
        return res
        
    #check user account
    @endpoints.route('/check/account', methods=['GET','POST'])
    def checkUser():
        global name, user_id
        user_id=None
        res = {}
        try:
            req_body = request.get_json()
            print(req_body["Email_ID"])
            print(req_body["Password"])
            user = user_collection.find_one({'Email': req_body["Email_ID"]})
            
            if user is not None:
                print(ObjectId(user['_id']))
                user_id = str(ObjectId(user['_id']))
                if req_body["Password"] == user["Password"]:
                    name=user["Name"]
                    status = {
                    "statusCode": "200",
                    "statusMessage": "User Login successfull"
                    }
                
                else:
                    status = {
                        "statusCode": "200",
                        "statusMessage": "Invalid Password"
                    }
                
            else:
                status = {
                    "statusCode": "200",
                    "statusMessage": "Invalid User"
                }
            
        except Exception as e:
            print(e)
            status = {
                "statusCode": "400",
                "statusMessage": str(e)
            }
        res['Name'] = name
        res['status'] = status
        return res

    return endpoints
