import os
from flask import Flask
from dotenv import load_dotenv
from controllers.document import document_controller
from controllers.summary import summary_controller

load_dotenv()
DEBUG = (os.getenv('DEBUG', 'False') == 'True')

URL_PREFIX = os.getenv("URL_PREFIX", "/api")

app = Flask(__name__, static_folder="public", static_url_path="/")
app.register_blueprint(document_controller, url_prefix=URL_PREFIX)
app.register_blueprint(summary_controller, url_prefix=URL_PREFIX)

# Run the app
if __name__ == "__main__":
    if(DEBUG):
        app.run(debug=True)
    else:
        app.run()