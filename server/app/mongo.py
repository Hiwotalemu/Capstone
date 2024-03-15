from pymongo import MongoClient
import certifi
import json
from datetime import datetime




 
def insert_user(username, password):
    db = client['news_analysis']
    collection = db['users']
    document = {"username": username, "password":password}
    insert_doc = collection.insert_one(document)
    print(f"inserted document ID : {insert_doc.inserted_id}")
 
def verify_user(username, password):
    db = client['news_analysis']
    collection = db['users']
    user = collection.find_one({"username": username, "password": password})
    return user
 
# def create_analysis_document(article_id, domain, url, competitor_links, bias_score, analysis_timestamp):
#     # Create a dictionary representing the analysis document
#     analysis_document = {
#         "article_id": article_id,
#         "domain": domain,
#         "url": url,
#         "competitor_links": competitor_links,
#         "bias_score": bias_score,
#     }
   
#     # Convert the dictionary to JSON format
#     json_document = json.dumps(analysis_document)
   
#     return json_document



def create_analysis_result(article_id, url, domain, linkage, bias_score):
    # Create a dictionary representing the analysis result for a single article
    analysis_result = {
        "article_id": article_id,
        "url": url,
        "domain": domain,
        "linkage": linkage,
        "bias_score": bias_score
    }
    return analysis_result
 
def aggregate_analysis_results(analysis_results):
    # Create an empty list to store analysis result documents
    aggregated_results = []
   
    # Loop through each analysis result and create documents
    for result in analysis_results:
        analysis_document = create_analysis_result(result["article_id"], result["url"], result["domain"], result["linkage"], result["bias_score"])
        aggregated_results.append(analysis_document)
   
    # Create the final document to insert into MongoDB
    final_document = {
        "time": datetime.now().isoformat(),
        "user": "User123",  # Example user
        "article_amount": len(analysis_results),
        "domain_amount": len(set(result["domain"] for result in analysis_results)),
        "analysis_results": aggregated_results
    }
    return final_document
 
client = MongoClient("mongodb+srv://group3:P0rznkjsS12VxhRU@newscoverageanalysis.4ay29qx.mongodb.net/?retryWrites=true&w=majority&appName=NewsCoverageAnalysis", tlsCAFile=certifi.where())
if (client):
    print("yes")
# insert_user("johndoe", "pass")
# user = verify_user("admin", "password")
# print(user)
analysis_results = [
    {"article_id": 1, "url": "https://www.nytimes.com/", "domain": "nytimes", "linkage": ["link1.com", "link2.com"], "bias_score": 0.75},

    {"article_id": 11, "url": "https://www.washingtonpost.com/", "domain": "washingtonpost", "linkage": ["link1.com", "link2.com"], "bias_score": 0.6}
    # Add more analysis results here...
]
 
aggregated_document = aggregate_analysis_results(analysis_results)
# temp = json.dumps(aggregated_document, indent=2)
db = client['news_analysis']
collection = db['analysis_results']
insert_doc = collection.insert_one(aggregated_document)
print(f"inserted document ID : {insert_doc.inserted_id}")
 

client.close()




# app.config['MONGODB_SETTINGS'] = {
#     'db': 'your_db_name',
#     'host': 'mongodb://localhost:27017/
# }

# db = MongoEngine(app)


















# from flask import Flask
# from flask_mongoengine import MongoEngine

# app = Flask(__name__)


# app.config['MONGODB_SETTINGS'] = {
#     'db': 'your_db_name',
#     'host': 'mongodb://localhost:27017/
# }

# db = MongoEngine(app)


# class User(db.Document):
#     username = db.StringField(max_length=80, unique=True, required=True)
#     email = db.StringField(max_length=120, unique=True, required=True)

#     def __repr__(self):
#         return f'<User {self.username}>'
