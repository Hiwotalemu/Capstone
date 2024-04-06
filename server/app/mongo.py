



# from pymongo import MongoClient
# import certifi
# import json
# from datetime import datetime
# from bson import ObjectId
# from keywordsdetect import extract_keywords
# import spacy
# from collections import Counter

# # Atlas values
# MONGO_URI = "mongodb+srv://group3:P0rznkjsS12VxhRU@newscoverageanalysis.4ay29qx.mongodb.net/?retryWrites=true&w=majority&appName=NewsCoverageAnalysis"
# # DATABASE_NAME = 'your-database-name'

# #Establishing connection with Database
# client = MongoClient(MONGO_URI, tlsCAFile=certifi.where())
# if (client):
#     print("Established connection with Database")
# db = client['news_analysis']

 
# def insert_user(username, password):
#     db = client['news_analysis']
#     collection = db['users']
#     document = {"username": username, "password":password}
#     insert_doc = collection.insert_one(document)
#     print(f"inserted document ID : {insert_doc.inserted_id}")
 
# def verify_user(username, password):
#     db = client['news_analysis']
#     collection = db['users']
#     user = collection.find_one({"username": username, "password": password})
#     return user
 
# # def create_analysis_document(article_id, domain, url, competitor_links, bias_score, analysis_timestamp):
# #     # Create a dictionary representing the analysis document
# #     analysis_document = {
# #         "article_id": article_id,
# #         "domain": domain,
# #         "url": url,
# #         "competitor_links": competitor_links,
# #         "bias_score": bias_score,
# #     }
   
# #     # Convert the dictionary to JSON format
# #     json_document = json.dumps(analysis_document)
   
# #     return json_document

# def extract_keywords(text):
#     if text is None:
#         raise ValueError("Input text is None. Cannot process.")
    
#     nlp = spacy.load('en_core_web_sm')
#     doc = nlp(text)
#     baiswords = ['I', 'me', 'myself', 'my', 'mine', 'we', 'us', 'our', 'ours', 'unfair']
#    #keywords = [token.text for token in doc if token.is_alpha and not token.is_stop]
#     keywords = [token.text for token in doc if token.is_alpha and not token.is_stop and token.text.lower() in baiswords]
    
    
#     # Count the frequency of each keyword
#     keyword_counts = Counter(keywords)
#     print(keywords)
#     # Sort keywords by frequency
#     sorted_keywords = sorted(keyword_counts.items(), key=lambda x: x[1], reverse=True)

#     return sorted_keywords[:10]  # Return top 10 most frequently used words


# def create_analysis_result(article_id, url, domain, linkage, bias_score, content):

#     # Create a dictionary representing the analysis result for a single article
#     analysis_result = {
#         "article_id": article_id,
#         "url": url,
#         "domain": domain,
#         "linkage": linkage,
#         "bias_score": bias_score,
#         "keywords": content  
#     }
#     return analysis_result
 
# def aggregate_analysis_results(analysis_results):
#     # Create an empty list to store analysis result documents
#     aggregated_results = []
   
#     # Loop through each analysis result and create documents
#     for result in analysis_results:
#         # Check if the content field exists in the analysis result
#         if 'content' in result:
#             # Extract keywords from the 'content' field
#             keywords = extract_keywords(result['content'])
#             # Add the keywords to the analysis result
#             result['keywords'] = keywords
#             # Append the modified result to the aggregated results list
#             aggregated_results.append(result)
#         else:
#             print("Error: 'content' field not found in analysis result.")
#             continue
        
#         # Append the modified analysis result to the aggregated results list
  
        
#     # Create the final document to insert into MongoDB
#     final_document = {
#         "time": datetime.now().isoformat(),
#         "user": "User123",  
#         "article_amount": len(analysis_results),
#         "domain_amount": len(set(result["domain"] for result in analysis_results)),
#         "analysis_results": aggregated_results
#     }
#     return final_document

# def retrieve_recent_analysis(user):
#     collection = db['analysis_results']
#     results = collection.find_one({"user": user})
#     # close_connection()
#     return convert_objectid(results)

# def convert_objectid(doc):
#     """
#     Recursively convert ObjectId fields to strings in a document or a list of documents.
#     """
#     if isinstance(doc, list):
#         return [convert_objectid(item) for item in doc]
    
#     if not isinstance(doc, dict):
#         return doc

#     for key, value in doc.items():
#         if isinstance(value, ObjectId):
#             doc[key] = str(value)
#         elif isinstance(value, dict) or isinstance(value, list):
#             doc[key] = convert_objectid(value)
#     return doc
    

 
# # Remember to close the client connection when the app is terminating
# def close_connection():
#     client.close()


















# # from flask import Flask
# # from flask_mongoengine import MongoEngine

# # app = Flask(__name__)


# # app.config['MONGODB_SETTINGS'] = {
# #     'db': 'your_db_name',
# #     'host': 'mongodb://localhost:27017/
# # }

# # db = MongoEngine(app)


# # class User(db.Document):
# #     username = db.StringField(max_length=80, unique=True, required=True)
# #     email = db.StringField(max_length=120, unique=True, required=True)

# #     def __repr__(self):
# #         return f'<User {self.username}>'
