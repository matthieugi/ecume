from flask import Blueprint, request
from services.state_store import StateStore
from services.file_store import FileStore
from services.cognitive_skills import CognitiveSkills

summary_controller = Blueprint("summary_controller", __name__)

state_store = StateStore()
file_store = FileStore()
cognitive_skills = CognitiveSkills()

@summary_controller.route("/summary/<string:partition_key>/<string:document_id>", methods=["POST"])
def create_summary(partition_key, document_id):

    if(not partition_key or not document_id):
        return "Bad request", 400

    document = state_store.read_document(document_id, partition_key)
    summary = cognitive_skills.summarize(document["book_text"])

    document["summary"] = summary
    state_store.save_document(document)

    return summary

@summary_controller.route("/cover/<string:partition_key>/<string:document_id>", methods=["POST"])
def create_cover(partition_key, document_id):

    if(not partition_key or not document_id):
        return "Bad request", 400

    document = state_store.read_document(document_id, partition_key)
    cover = cognitive_skills.create_cover(document["summary"])

    document["cover"] = cover
    state_store.save_document(document)

    return cover