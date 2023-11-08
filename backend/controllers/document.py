
from flask import Blueprint, request
from controllers.summary import create_summary_async
from services.state_store import StateStore
from services.file_store import FileStore
from utils.utils import read_pdf

document_controller = Blueprint("document_controller", __name__)
state_store = StateStore()
file_store = FileStore()

@document_controller.route("/document/<string:partition_key>/<string:document_id>", methods=["GET"])
def get_document(partition_key, document_id):
    document = state_store.read_document(document_id, partition_key)
    
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

    name = request.form["name"]
    author = request.form["author"]
    file = request.files["book"]
    book_text = read_pdf(file.stream)

    doc = state_store.create_document(name, author, book_text)
    file_store.upload_file(doc["id"], file.stream)

    return doc

@document_controller.route("/document/<string:partition_key>/<string:document_id>", methods=["DELETE"])
def delete_document(partition_key, document_id):
    document = state_store.read_document(document_id, partition_key)

    if(document is None):
        return "Not found", 404

    state_store.delete_document(document_id, partition_key)
    file_store.delete_file(document["id"])

    return f"Document deleted successfully"

@document_controller.route("/document/<string:partition_key>/<string:document_id>/<string:type>", methods=["DELETE"])
def delete_document_prompt_result(partition_key, document_id, type):
    document = state_store.read_document(document_id, partition_key)

    if(document is None):
        return "Not found", 404

    elif(type == "cover"):
        document["cover"] = ""
    else:
        return "Not found", 404

    state_store.save_document(document)

    return f"Document {type} deleted successfully"