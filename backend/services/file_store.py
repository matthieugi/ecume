import os, uuid
from azure.identity import DefaultAzureCredential
from azure.storage.blob import BlobServiceClient, BlobClient, ContainerClient

ACCOUNT_NAME = os.getenv("STORAGE_ACCOUNT_NAME")
ACCOUNT_URL = f"https://{ACCOUNT_NAME}.blob.core.windows.net"
CONTAINER_NAME = "books"


class FileStore:
    _instance = None
    _blob_container_client = None
    
    def __new__(cls, *args, **kwargs):
        if not isinstance(cls._instance, cls):
            
            cls._instance = super(FileStore, cls).__new__(cls, *args, **kwargs)
            blob_service_client = BlobServiceClient(ACCOUNT_URL, credential=DefaultAzureCredential())
            cls._blob_container_client = blob_service_client.get_container_client(CONTAINER_NAME)

        return cls._instance
    
    def upload_file(cls, file_name, stream):
        blob_client = cls._blob_container_client.get_blob_client(file_name)
        return blob_client.upload_blob(stream.read(), overwrite=True)

    def delete_file(cls, file_name):
        blob_client = cls._blob_container_client.get_blob_client(file_name)
        return blob_client.delete_blob()
    
    def download_file(cls, file_name):
        blob_client = cls._blob_container_client.get_blob_client(file_name)
        return blob_client.download_blob()
