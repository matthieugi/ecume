import os
from flask import Flask
import uuid

app = Flask(__name__)

# Load environment variables from .env file
from dotenv import load_dotenv
load_dotenv()


# Create a Cosmos DB client using DefaultAzureCredential
cosmosdb_uri = os.getenv("COSMOSDB_URI")
azure_credential = DefaultAzureCredential()
cosmosdb_client = CosmosClient(cosmosdb_uri, credential=azure_credential)

# Get a reference to the database and container
database_name = "ecume"
container_name = "summaries"
database = cosmosdb_client.get_database_client(database_name)
container = database.get_container_client(container_name)


# Define routes
@app.route("/")
def home():
    return f"Hello World! {param1} {param2}"


@app.route("/summary/<string:documentId>", methods=["GET"])
def get_summary(document_id):
    document = container.query_items(
        query="SELECT * FROM c WHERE c.id = @documentId",
        parameters=[
            dict(name="@documentId", value=document_id)
        ],
        enable_cross_partition_query=True
    )

    return f"Summary for document {document_id}"

@app.route("/summary", methods=["POST"])
def post_summary(document_id):

    if(not request.is_json):
        return "Bad request", 400

    genre = request.json["genre"]
    id = str(uuid.uuid4())
    file = request.files["book"]

    container.upsert_item({
        "id": id,
        "genre" : genre
        "status": "pending",
        "summary": ""
    })

    

    return f"Summary for document {document_id}"


# Run the app
if __name__ == "__main__":
    app.run(debug=True)