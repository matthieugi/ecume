import os
import time
import json
from services.audio import create_audio
from services.cognitive_skills import CognitiveSkills
from services.file_store import FileStore
from services.state_store import StateStore
from services.message_store import MessageStore

state_store = StateStore()
file_store = FileStore()
message_store = MessageStore()
cognitive_skills = CognitiveSkills()

def read_messages():
    message_store = MessageStore()
    while True:
        messages = message_store.read_message('summary')

        for message in messages:
                document = json.loads(message.content)
                document_id = document['document_id']
                partition_key = document['partition_key']
                document = state_store.read_document(document_id, partition_key)
                summary = cognitive_skills.summarize(document["book_text"])
                # summary = document["summary"]

                document["summary"] = summary
                document["themes"] = cognitive_skills.create_themes(summary)
                document["covers"] = cognitive_skills.create_covers(summary)   

                for cover in document["covers"]:
                    audio = create_audio(f"{document_id}-{cover['persona_name']}", cover['content'])
                    stream = open(f"{document_id}-{cover['persona_name']}.wav", "rb")
                    file_store.upload_file(f"{document_id}-{cover['persona_name']}.wav", stream)
                    os.remove(f"{document_id}-{cover['persona_name']}.wav")

                document["status"] = "Completed"
                message_store.delete_message('summary', message)
                state_store.save_document(document)
        time.sleep(5)