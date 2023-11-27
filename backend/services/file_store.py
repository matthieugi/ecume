from datetime import datetime, timedelta
import os
from azure.identity import DefaultAzureCredential
from azure.storage.blob import BlobServiceClient, BlobClient, ContainerClient, BlobSasPermissions, generate_blob_sas
from azure.storage.blob._models import BlobSasPermissions

ACCOUNT_NAME = os.getenv("STORAGE_ACCOUNT_NAME")
ACCOUNT_URL = f"https://{ACCOUNT_NAME}.blob.core.windows.net"
CONTAINER_NAME = "books"


class FileStore:
    _instance = None
    _blob_container_client = None
    _blob_service_client = None
    
    def __new__(cls, *args, **kwargs):
        if not isinstance(cls._instance, cls):
            
            cls._instance = super(FileStore, cls).__new__(cls, *args, **kwargs)
            cls._blob_service_client = BlobServiceClient(ACCOUNT_URL, credential=DefaultAzureCredential())
            cls._blob_container_client = cls._blob_service_client.get_container_client(CONTAINER_NAME)

        return cls._instance
    
    def upload_file(cls, file_name, stream):
        blob_client = cls._blob_container_client.get_blob_client(file_name)
        return blob_client.upload_blob(stream.read(), overwrite=True)

    def upload_audio(cls, file_name, stream):
        blob_client = cls._blob_container_client.get_blob_client(file_name)
        return blob_client.upload_blob(stream.read_data(), overwrite=True)

    def delete_file(cls, file_name):
        blob_client = cls._blob_container_client.get_blob_client(file_name)
        return blob_client.delete_blob()

    def download_file(cls, file_name):
        blob_client = cls._blob_container_client.get_blob_client(file_name)
        return blob_client.download_blob()

    def generate_sas(cls, file_name):
        blob_client = cls._blob_container_client.get_blob_client(file_name)
        user_delegation_key = cls._blob_service_client.get_user_delegation_key(datetime.utcnow(), datetime.utcnow() + timedelta(days=1))
        sas_token = generate_blob_sas(account_name=ACCOUNT_NAME,
                        container_name=CONTAINER_NAME,
                        blob_name=file_name,
                        account_key=None,
                        user_delegation_key=user_delegation_key,
                        permission=BlobSasPermissions(read=True),
                        expiry=datetime.utcnow() + timedelta(days=1))
        
        return f"{blob_client.url}?{sas_token}"
