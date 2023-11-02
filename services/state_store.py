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
    
    def delete_document(cls, document_id):
        return cls._document_container.delete_item(document_id)
    
    def get_document(cls, document_id):
        return cls._document_container.query_items(
            query="SELECT * FROM c WHERE c.id = @documentId",
            parameters=[
                dict(name="@documentId", value=document_id)
            ]
        )
    
    def create_document(cls, document_name, author):
        return cls._document_container.upsert_item({
            "id": uuid.uuid4(),
            "name": document_name,
            "author": author,
            "status": "pending",
            "summary": []
        })
