
from flask import Blueprint, request
from services.state_store import StateStore
from services.file_store import FileStore
from utils.utils import read_pdf

document_controller = Blueprint("document_controller", __name__)
state_store = StateStore()
file_store = FileStore()

@document_controller.route("/document/<string:partitionkey>/<string:documentId>", methods=["GET"])
def get_document(partitition_key, document_id):
    document = state_store.read_document(document_id, partitition_key)
    
    if(document is None):
        return "Not found", 404

    return document

@document_controller.route("/document", methods=["GET"])
def list_documents():
    return state_store.list_documents()

@document_controller.route("/document", methods=["POST"])
def create_document():

    if(not request.form["author"] or not request.files["book"]):
        return "Bad request", 400

    author = request.form["author"]
    file = request.files["book"]
    book_text = read_pdf(file.stream)

    file_store.upload_file(file.filename, file.stream)
    doc = state_store.create_document(file.filename, author, book_text)

    return doc

@document_controller.route("/document/<string:partition_key>/<string:document_id>", methods=["DELETE"])
def delete_document(partition_key, document_id):
    document = state_store.read_document(document_id, partition_key)

    if(document is None):
        return "Not found", 404

    state_store.delete_document(document_id, partition_key)
    file_store.delete_file(document["name"])

    return f"Document deleted successfully"