import os
from flask import Flask
from dotenv import load_dotenv
from controllers.document import document_controller
from controllers.summary import summary_controller

load_dotenv()
DEBUG = (os.getenv('DEBUG', 'False') == 'True')

API_SUBDOMAIN = os.getenv("API_SUBDOMAIN", "api")

app = Flask(__name__)
app.register_blueprint(document_controller, subdomain=API_SUBDOMAIN")
app.register_blueprint(summary_controller, subdomain=API_SUBDOMAIN")

# Run the app
if __name__ == "__main__":
    if(DEBUG):
        app.run(debug=True)
    else:
        app.run()