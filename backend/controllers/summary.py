from flask import Blueprint, request
from services.state_store import StateStore
from services.file_store import FileStore
from services.cognitive_skills import CognitiveSkills
from services.message_store import MessageStore
from services.audio import create_audio
import json
import os

summary_controller = Blueprint("summary_controller", __name__)

state_store = StateStore()
file_store = FileStore()
message_store = MessageStore()
cognitive_skills = CognitiveSkills()

@summary_controller.route("/summary/<string:partition_key>/<string:document_id>", methods=["POST"])
def create_summary(partition_key, document_id):
    if(not partition_key or not document_id):
        return "Bad request", 400
    
    try:
        message_store.send_message("summary", json.dumps({
            "partition_key": partition_key,
            "document_id": document_id
        }))
        return "OK", 200

    except Exception as e:
        return f"Internal Server Error: {e}", 500

async def create_summary_async(partition_key, document_id):
    await create_summary(partition_key, document_id)
    await create_cover(partition_key, document_id)

@summary_controller.route("/cover/<string:partition_key>/<string:document_id>", methods=["POST"])
def create_cover(partition_key, document_id):

    if(not partition_key or not document_id):
        return "Bad request", 400
    
    prompt = request.form['prompt']
    document = state_store.read_document(document_id, partition_key)
    cover = cognitive_skills.create_cover(document["summary"], prompt)

    document["cover"] = cover
    state_store.save_document(document)

    return cover

@summary_controller.route("/theme/<string:partition_key>/<string:document_id>", methods=["POST"])
def create_themes(partition_key, document_id):

    if(not partition_key or not document_id):
        return "Bad request", 400
    
    document = state_store.read_document(document_id, partition_key)
    themes = cognitive_skills.create_themes(document["summary"])        

    document["themes"] = themes
    state_store.save_document(document)

    return themes

@summary_controller.route("/covers/<string:partition_key>/<string:document_id>", methods=["POST"])
def create_covers(partition_key, document_id):

    if(not partition_key or not document_id):
        return "Bad request", 400
    
    document = state_store.read_document(document_id, partition_key)
    covers = cognitive_skills.create_covers(document["summary"])

    for cover in covers:
        audio = create_audio(f"{document_id}-{cover['persona_name']}", cover['content'])
        stream = open(f"{document_id}-{cover['persona_name']}.wav", "rb")
        file_store.upload_file(f"{document_id}-{cover['persona_name']}.wav", stream)
        os.remove(f"{document_id}-{cover['persona_name']}.wav")

    document["covers"] = covers
    state_store.save_document(document)

    return covers

@summary_controller.route("/audio/<string:partition_key>/<string:document_id>/<string:persona>", methods=["GET"])
def get_audio_file(partition_key, document_id, persona):
    sas_url = file_store.generate_sas(f"{document_id}-{persona}.wav")
    return { 'url': sas_url }

@summary_controller.route("/prompt", methods=["GET"])
def get_prompts():
    return cognitive_skills.get_prompts()