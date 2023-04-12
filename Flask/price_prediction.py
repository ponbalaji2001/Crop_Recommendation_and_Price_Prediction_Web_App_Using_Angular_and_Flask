from flask import request, jsonify
import joblib
import warnings
import pandas as pd
warnings.filterwarnings("ignore", category=UserWarning)


def pricePrediction(endpoints):

    @endpoints.route('/predict/price', methods=['GET', 'POST'])
    def predictData():
        global vegetable, season, month, condition, disaster, temp
        res = {}
        try:
            req_body = request.get_json()
            vegetable = req_body["Vegetable"]
            season = req_body["Season"]
            month = req_body["Month"]
            condition = req_body["Condition"]
            disaster = req_body["Disaster"]
            temp = float(req_body["Temperature"])
       
            model = joblib.load("./static/Price_model3.joblib")
            test_data = [[vegetable, season, month, temp, disaster, condition]]

            df = pd.DataFrame(test_data)
            [result] = model.predict(df)
            result = "{:.2f}".format(result)
            print("per kg price of " + "veg" + " is " + str(result))
            status = {
                "statusCode": "200",
                "statusMessage": "Prediction Done Successfully"
            }
            return jsonify({'price_result': str(result)})

        except Exception as e:
            print(e)
            status = {
                "statusCode": "400",
                "statusMessage": str(e)
            }
        res['status'] = status
        return res

  

    return endpoints
