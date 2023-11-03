import os
from flask import Flask
from dotenv import load_dotenv
from controllers.document import document_controller

load_dotenv()
DEBUG = (os.getenv('DEBUG', 'False') == 'True')

app = Flask(__name__)
app.register_blueprint(document_controller)

# Run the app
if __name__ == "__main__":
    if(DEBUG):
        app.run(debug=True)
    else:
        app.run()