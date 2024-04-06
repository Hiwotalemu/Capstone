from flask import Flask, request, render_template, jsonify, send_from_directory
from flask_cors import CORS
import os
from webscraping import scrape_webpage
from analyze import analyze_sentiment
from keywordsdetect import extract_keywords
from werkzeug.utils import secure_filename
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from pymongo import MongoClient
import certifi
from urllib.parse import urlparse
from bs4 import BeautifulSoup
from bson.objectid import ObjectId
from datetime import datetime
import string
import spacy
import mongo
import bs4 


app = Flask(__name__)
CORS(app, origins="http://localhost:3000")
nltk.download('stopwords')


@app.route('/')
def index():
    return 'Hello, this is the root route!'
# client = MongoClient("mongodb+srv://group3:P0rznkjsS12VxhRU@newscoverageanalysis.4ay29qx.mongodb.net/?retryWrites=true&w=majority&appName=NewsCoverageAnalysis", tlsCAFile=certifi.where())
# db = client['news_analysis']
# user_collection = db['users']
# result_collection = db['analysis_results']

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'txt', 'html'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER



def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/upload', methods=['POST'])
def upload():
#     results = mongo.retrieve_recent_analysis("User123")
#    #print(results)
#    //return results

    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)

        os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        with open(file_path, 'r') as file_content:
            content = file_content.read() 


            
#create a colder save it and read the script files from the mongo db frmo zip and extracted files 
        #results = [] 
            # results = []
        #  for url in urls:
           
                # headlines, content = scrape_webpage(url)
                # print("Content:", content)
                # if content is not None:
                #     sentiment = analyze_sentiment(content)
                #     keywords = extract_keywords(content)
        headlines = []  # Adjust this based on the structure of your HTML/TXT file
        sentiment = analyze_sentiment(content)
        keywords = extract_keywords(content)

    
        score = calculate_score(sentiment, len(keywords))
  
        soup = BeautifulSoup(content, 'html.parser')



        domain_links = {}
        for link in soup.find_all('a', href=True):
            url = link['href']
            domain = urlparse(url).netloc
            if domain not in domain_links:
                domain_links[domain] = []
            domain_links[domain].append(url)

        print("Domain Links:", domain_links)



        result = {
           # "user_id": user_id,
            'filename': filename,
            'headlines': headlines,
            #'content': content,
            'sentiment': sentiment,
            'keywords': keywords,
            'score': score,
            "upload_date" : datetime.now(),
            'domain_links':domain_links
        }

#     for domain, links in domain_links.items():
#         link_info = []
#         for link in links:
#         # Analyze the link here if needed
#         # For example, you might want to extract additional information from the link
#             link_info.append({'url': link})  # You can add more information as needed
#     result['domain_links'][domain] = link_info

# # Print or store the result as needed
#     # print(f"Results for {filename}: {result}")


#      #  result_id = result_collection.insert_one(result).inserted_id
#       #  print(f"Inserted document ID: {result_id}")
        
#         #results.append(result)
#          print(f"Results for {filename}: {result}")
       # print(f"Score for {filename}: {score}")

        return jsonify(result)

    else:
        return jsonify({'error': 'Invalid file type'})
#anotehr method for domain where it takes the links from the pulled and saved file and prints the domain dictionary within each itll have 

  #results.append({'url': url, 'headlines': headlines, 'content': content, 'sentiment': sentiment, 'keywords': keywords})
def calculate_score(sentiment, num_keywords):
    # Define your scoring logic here
    sentiment_score = {'positive': 2, 'neutral': 1, 'negative': 0}.get(sentiment, 0)
    keyword_score = num_keywords * 0.5  
    
    max_possible_score = 2 + (num_keywords * 0.5)
    total_score = sentiment_score + keyword_score
    percentage_score = (total_score / max_possible_score) * 100
    
    return percentage_score

# @app.route('/uploads/<filename>')
# def uploaded_file(filename):
#     return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == "__main__":
    app.run(debug=True)

#client.close()


# @app.route('/analyze', methods=['POST'])
# def analyze_document():
#     if 'file' not in request.files:
#         return jsonify({'error': 'No file part'})

#     file = request.files['file']

#     if file.filename == '':
#         return jsonify({'error': 'No selected file'})

#     text = file.read().decode('utf-8')
    
#     # Use spaCy for keyword extraction
#     doc = nlp(text)
#     keywords = [token.text for token in doc if token.is_alpha and not token.is_stop]

#     # Your analysis results can be sent as JSON
#     result = {
#         'keywords': keywords,
#         'text': text  # You may want to send the original text for reference
#     }

#     return jsonify(result)

