import os
from datetime import datetime, timedelta
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
    _openai_credential = None
    _openai_credential_expiration = None

    def __new__(cls, *args, **kwargs):
        if not isinstance(cls._instance, cls):
            cls._instance = super(CognitiveSkills, cls).__new__(cls, *args, **kwargs)
        return cls._instance
    
    def get_llm_instance(cls, gpt_version):
        if cls._openai_credential_expiration is None or cls._openai_credential_expiration < datetime.now():
            cls._openai_credential = azure_credential.get_token("https://cognitiveservices.azure.com/.default").token
            cls._openai_credential_expiration = datetime.now() + timedelta(hours=8)

            match gpt_version:
                case "gpt-35-turbo-16k":
                    cls._gpt35turbo = AzureChatOpenAI(
                        openai_api_base=AZURE_OPENAI_API_BASE,
                        openai_api_key=cls._openai_credential,
                        openai_api_type=OPENAI_API_TYPE,
                        openai_api_version=OPENAI_API_VERSION,
                        deployment_name=GPT35_DEPLOYMENT_NAME,
                    )
                case "gpt4":
                    cls._gpt4 = AzureChatOpenAI(
                        openai_api_base=AZURE_OPENAI_API_BASE,
                        openai_api_key=cls._openai_credential,
                        openai_api_type=OPENAI_API_TYPE,
                        openai_api_version=OPENAI_API_VERSION,
                        deployment_name=GPT4_DEPLOYMENT_NAME,
                    )
                case "gpt-4-32k":
                    cls._gpt432 = AzureChatOpenAI(
                        openai_api_base=AZURE_OPENAI_API_BASE,
                        openai_api_key=cls._openai_credential,
                        openai_api_type=OPENAI_API_TYPE,
                        openai_api_version=OPENAI_API_VERSION,
                        deployment_name=GPT4_32_DEPLOYMENT_NAME,
                    )
        
        match gpt_version:
            case "gpt-35-turbo-16k":
                return cls._gpt35turbo
            case "gpt4":
                return cls._gpt4
            case "gpt-4-32k":
                return cls._gpt432
            
        

    
    def summarize(cls, text):
        chunks = chunk_text(text, 3000)
        summary = ""
        llm_instance = cls.get_llm_instance("gpt-35-turbo-16k")

        for index, chunk in enumerate(chunks):
            print(f"{index}/{len(chunks)}")
            
            try:
                response = llm_instance([
                    HumanMessage(content=SUMMARY_PROMPT),
                    HumanMessage(content=chunk)
                ])
                summary += f"{response.content} "

            except Exception as e:
                print(f"error : {e}")
                continue
            
        return summary
    
    def create_cover(cls, text, prompt):
        chunks = chunk_text(text, 30000)
        llm_instance = cls.get_llm_instance("gpt-4-32k")

        try:
            response = llm_instance([
                HumanMessage(content=prompt),
                HumanMessage(content=chunks[0])
            ])
            return response.content

        except Exception as e:
            print(f"error: {e}")
            return f"error : {e}", 500
        
    def get_prompts(cls):
        return {
            "cover": COVER_PROMPT
        }



