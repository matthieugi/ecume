# set the environment variables needed for openai package to know to reach out to azure
import os
from langchain.embeddings import AzureOpenAIEmbeddings

os.environ["OPENAI_API_TYPE"] = "azure"
os.environ["OPENAI_API_BASE"] = "https://ceos.openai.azure.com/"
os.environ["OPENAI_API_KEY"] = "331471ad74214598a37c2bce297928cc"
os.environ["OPENAI_API_VERSION"] = "2023-05-15"


embeddings = AzureOpenAIEmbeddings(
    azure_deployment="embeddingada",
    openai_api_version="2023-05-15",
)

text = "combien d'amis avait maman ?"

query_resutls = embeddings.embed_query(text)

print(query_resutls)