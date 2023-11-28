import os
from flask import Flask, send_from_directory
from dotenv import load_dotenv
import threading
from controllers.document import document_controller
from controllers.summary import summary_controller
from controllers.summary_backend import read_messages

load_dotenv()
DEBUG = (os.getenv('DEBUG', 'False') == 'True')
URL_PREFIX = os.getenv("URL_PREFIX", "/api")
APPINSIGHTS_CONNECTION_STRING = os.getenv("APPINSIGHTS_CONNECTION_STRING")

app = Flask(__name__, static_folder="public")

app.register_blueprint(document_controller, url_prefix=URL_PREFIX)
app.register_blueprint(summary_controller, url_prefix=URL_PREFIX)

#Serve Static Files
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


def app_backend_thread():
    thread = threading.Thread(target=read_messages)
    thread.start()

app_backend_thread()

# Run the app
if __name__ == "__main__":
    print("Starting Flask app")
    if(DEBUG):
        app.run(debug=True)
    else:
        app.run()