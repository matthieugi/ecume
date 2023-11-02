from flask import Flask
from dotenv import load_dotenv
from controllers.document import document_controller

load_dotenv()

app = Flask(__name__)
app.register_blueprint(document_controller)

# Run the app
if __name__ == "__main__":
    app.run(debug=True)