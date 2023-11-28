from azure.identity import DefaultAzureCredential
from azure.storage.queue import QueueServiceClient
import os

ACCOUNT_NAME = os.getenv("STORAGE_ACCOUNT_NAME")
ACCOUNT_URL = f"https://{ACCOUNT_NAME}.queue.core.windows.net"

class MessageStore:
    _shared_state = {}

    _instance = None
    _queue_client = None
    
    def __new__(cls, *args, **kwargs):
        if not isinstance(cls._instance, cls):            
            cls._instance = super(MessageStore, cls).__new__(cls, *args, **kwargs)
            credential = DefaultAzureCredential()
            cls.queue_client = QueueServiceClient(account_url=ACCOUNT_URL, credential=credential)

        return cls._instance

    def read_message(cls, queue_name):
        queue_client = cls.queue_client.get_queue_client(queue_name)
        messages = queue_client.receive_messages()
        return messages

    def send_message(cls, queue_name, message):
        queue_client = cls.queue_client.get_queue_client(queue_name)
        queue_client.send_message(message)

    def delete_message(cls, queue_name, message):
        queue_client = cls.queue_client.get_queue_client(queue_name)
        queue_client.delete_message(message)