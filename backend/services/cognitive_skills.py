import os
from utils.utils import chunk_text
from langchain.chat_models import AzureChatOpenAI
from langchain.schema import HumanMessage
from azure.identity import DefaultAzureCredential

azure_credential = DefaultAzureCredential()
openai_credential = azure_credential.get_token("https://cognitiveservices.azure.com/.default").token

GPT4_DEPLOYMENT_NAME = os.getenv("GPT4_DEPLOYMENT_NAME", "gpt4")
GPT35_DEPLOYMENT_NAME = os.getenv("GPT35_DEPLOYMENT_NAME", "gpt-35-turbo-16k")
GPT4_32_DEPLOYMENT_NAME = os.getenv("GPT4_32_DEPLOYMENT_NAME", "gpt-4-32k")
AZURE_OPENAI_API_BASE = os.getenv("AZURE_OPENAI_API_BASE")
SUMMARY_PROMPT = os.getenv("SUMMARY_PROMPT", "Summarize the following text:")
COVER_PROMPT = os.getenv("COVER_PROMPT", "Create a cover for the following text:")

OPENAI_API_TYPE = "azure_ad"
OPENAI_API_VERSION = "2023-05-15"

class CognitiveSkills:
    _instance = None
    _gpt35turbo = None
    _gpt4 = None
    _gpt432 = None

    def __new__(cls, *args, **kwargs):
        if not isinstance(cls._instance, cls):
            cls._instance = super(CognitiveSkills, cls).__new__(cls, *args, **kwargs)
            cls._gpt35turbo = AzureChatOpenAI(
                openai_api_base=AZURE_OPENAI_API_BASE,
                openai_api_key=openai_credential,
                openai_api_type=OPENAI_API_TYPE,
                openai_api_version=OPENAI_API_VERSION,
                deployment_name=GPT35_DEPLOYMENT_NAME,
            )
            # cls._gpt4 = AzureOpenAI(
            #     deployment_name=GPT4_DEPLOYMENT_NAME,
            #     credential=credential
            # )
            cls._gpt432 = AzureChatOpenAI(
                deployment_name=GPT4_32_DEPLOYMENT_NAME,
                openai_api_base=AZURE_OPENAI_API_BASE,
                openai_api_key=openai_credential,
                openai_api_type=OPENAI_API_TYPE,
                openai_api_version=OPENAI_API_VERSION,
            )
        return cls._instance
    
    def summarize(cls, text):
        chunks = chunk_text(text, 3000)
        summary = ""

        for index, chunk in enumerate(chunks):
            print(f"{index}/{len(chunks)}")
            
            try:
                response = cls._gpt35turbo([
                    HumanMessage(content=SUMMARY_PROMPT),
                    HumanMessage(content=chunk)
                ])
                summary += f"{response.content} "

            except Exception as e:
                print(f"error : {e}")
                continue
            
        return summary
    
    def create_cover(cls, text):
        chunks = chunk_text(text, 30000)

        try:
            response = cls._gpt432([
                HumanMessage(content=COVER_PROMPT),
                HumanMessage(content=chunks[0])
            ])
            return response.content

        except:
            print(f"error")
            return "", 500

            

        
        



