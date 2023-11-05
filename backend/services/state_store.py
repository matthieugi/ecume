import json
import os
import sys
import uuid

from azure.core.exceptions import AzureError
from azure.cosmos import CosmosClient, PartitionKey
from azure.identity import DefaultAzureCredential

COSMOS_ACCOUNT_URI = os.getenv("COSMOSDB_URI")
DATABASE_NAME = "ecume"
CONTAINER_NAME = "summaries"

class StateStore:
    _instance = None
    _document_container = None
    
    def __new__(cls, *args, **kwargs):
        if not isinstance(cls._instance, cls):            
            cls._instance = super(StateStore, cls).__new__(cls, *args, **kwargs)
            cls._document_container = CosmosClient(COSMOS_ACCOUNT_URI, DefaultAzureCredential()).get_database_client(DATABASE_NAME).get_container_client(CONTAINER_NAME)

        return cls._instance
    
    def save_document(cls, document):
        return cls._document_container.upsert_item(document)
    
    def delete_document(cls, document_id, partition_key):
        return cls._document_container.delete_item(document_id, partition_key)
    
    def read_document(cls, document_id, partition_key):
        return cls._document_container.read_item(document_id, partition_key)
    
    def list_documents(cls):
        return list(cls._document_container.query_items("SELECT c.id, c.name, c.author, c.status FROM c", enable_cross_partition_query=True))
    
    def create_document(cls, document_name, author, book_text):
        return cls._document_container.create_item({
            "id": str(uuid.uuid4()),
            "name": document_name,
            "author": author,
            "book_text": book_text,
            "status": "In Progress",
            "summary": []
        })
