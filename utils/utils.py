import os
import nltk
from pypdf import PdfReader
from langchain.text_splitter import NLTKTextSplitter

nltk.download('punkt')

def read_pdf(file_stream):
    reader = PdfReader(file_stream)
    book_text = ""

    for page in reader.pages:
        book_text += page.extract_text()
    
    book_text = book_text.replace("\n", " ")

    return book_text

def chunk_text(text, chunk_size):
    text_splitter = NLTKTextSplitter(chunk_size=chunk_size)
    return text_splitter.split_text(text)

