from flask import Flask, Blueprint
from flask_cors import CORS
from user import userData
from yield_prediction import yieldPrediction
from price_prediction import pricePrediction
from Email import EmailService
from flask_mail import Mail
import os
from dotenv import load_dotenv
load_dotenv()

def create_app():
    web_app = Flask(__name__)
    CORS(web_app)
    api_blueprint1 = Blueprint('api_blueprint1', __name__)
    api_blueprint1 = userData(api_blueprint1)

    api_blueprint2 = Blueprint('api_blueprint2', __name__)
    api_blueprint2 = yieldPrediction(api_blueprint2)

    api_blueprint3 = Blueprint('api_blueprint3', __name__)
    api_blueprint3 = pricePrediction(api_blueprint3)

    web_app.config['MAIL_SERVER'] = 'smtp.gmail.com'
    web_app.config['MAIL_PORT'] = 465
    web_app.config['MAIL_USERNAME'] = os.getenv("EMAIL")
    web_app.config['MAIL_PASSWORD'] = os.getenv("PASSWORD")
    web_app.config['MAIL_USE_TLS'] = False
    web_app.config['MAIL_USE_SSL'] = True
    mail = Mail(web_app)
    api_blueprint4 = Blueprint('api_blueprint4', __name__)
    api_blueprint4 = EmailService(api_blueprint4, mail)

    web_app.register_blueprint(api_blueprint1, url_prefix='/api')
    web_app.register_blueprint(api_blueprint2, url_prefix='/api')
    web_app.register_blueprint(api_blueprint3, url_prefix='/api')
    mail.init_app(web_app)
    web_app.register_blueprint(api_blueprint4, url_prefix='/api')

    return web_app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)
