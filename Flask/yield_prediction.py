from flask import request, jsonify
import joblib
import warnings
warnings.filterwarnings("ignore", category=UserWarning)

def yieldPrediction(endpoints):
    
    @endpoints.route('/predict/yield', methods=['GET', 'POST'])
    def predictData():
        global nitrogen, phosphorus, pottasium, ph, temperature, humidity, rainfall
        res = {}
        try:
            req_body = request.get_json()
            nitrogen = int((req_body["Nitrogen"]))
            phosphorus = int((req_body["Phosphorus"]))
            pottasium = int((req_body["Pottasium"]))
            ph = float((req_body["pH"]))
            temperature = float((req_body["Temperature"]))
            humidity = float((req_body["Humidity"]))
            rainfall = int((req_body["Rainfall"]))
            model = joblib.load("./static/Ensemble_Random_forest (1).joblib")
            test_data = [[nitrogen, phosphorus, pottasium,temperature, humidity, ph, rainfall]]
            [result] = predict(model, test_data)
            print("Best Crop for this parameter will be : "+str(result))
            status = {
                "statusCode": "200",
                "statusMessage": "Prediction Done Successfully"
            }
            return jsonify({'yield_result': str(result)})

        except Exception as e:
            print(e)
            status = {
                "statusCode": "400",
                "statusMessage": str(e)
            }
        res['status'] = status
        return res
    
    
    def predict(model, X):
        # Use random forest to get predictions for new input
        rf = model["random_forest"]
        X_pred = rf.predict_proba(X)
        # Use logistic regression to predict final class labels
        lr = model["logistic_regression"]
        y_pred = lr.predict(X_pred)
    
        return y_pred
    
    
    return endpoints
 


 