
from flask import Blueprint, request
from services.state_store import StateStore
from services.file_store import FileStore

document_controller = Blueprint("document_controller", __name__)
state_store = StateStore()
file_store = FileStore()

@document_controller.route("/document/<string:documentId>", methods=["GET"])
def get_document(document_id):
    document = state_store.get_document(document_id)
    
    if(document is None):
        return "Not found", 404

    return document

@document_controller.route("/document", methods=["POST"])
def create_document():

    if(not request.form["author"] or not request.files["book"]):
        return "Bad request", 400

    author = request.form["author"]
    file = request.files["book"]

    blob = file_store.upload_file(file.name, file.stream)
    state_store.create_document(file.name, author)

    return f"Document saved successfully"