from flask import Flask
from routes import handler
from flask_cors import CORS, cross_origin
import os

app = Flask(__name__)
CORS(app, support_credentials=True)

handler(app)

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')