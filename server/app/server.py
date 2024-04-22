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
import time
from collections import defaultdict


app = Flask(__name__)
CORS(app, origins="http://localhost:3000")
nltk.download('stopwords')


@app.route('/')
def index():
    return 'Hello, this is the root route!'

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'txt', 'html'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# MongoDB connection setup
MONGO_URI = "mongodb+srv://group3:P0rznkjsS12VxhRU@newscoverageanalysis.4ay29qx.mongodb.net/?retryWrites=true&w=majority&appName=NewsCoverageAnalysis"
client = MongoClient(MONGO_URI, tlsCAFile=certifi.where())
db = client['news_analysis']
collection = db['analysis_results']

# Define route to view a specific past collection
@app.route('/get-collection', methods=['GET'])
def get_collection():
    collection_id = request.args.get('id')
    if not collection_id:
        return jsonify({'error': 'Missing collection ID'}), 400

    try:
        # Retrieve the collection data from MongoDB
        collection_data = collection.find_one({'_id': ObjectId(collection_id)})
        if collection_data:
            # Convert ObjectId to string for JSON serialization
            collection_data['_id'] = str(collection_data['_id'])
            return jsonify(collection_data)
        else:
            return jsonify({'error': 'Collection not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Define route to delete a specific past collection
@app.route('/delete-collection', methods=['DELETE'])
def delete_collection():
    collection_id = request.args.get('id')
    if not collection_id:
        return jsonify({'error': 'Missing collection ID'}), 400

    try:
        # Delete the collection from MongoDB
        result = collection.delete_one({'_id': ObjectId(collection_id)})
        if result.deleted_count > 0:
            return jsonify({'message': 'Collection deleted successfully'})
        else:
            return jsonify({'error': 'Collection not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS



@app.route('/get-analysis-by-id')
def get_analysis_by_id():
    analysis_id = request.args.get('id')
    if not analysis_id:
        return jsonify({'error': 'Missing analysis ID'}), 400

    try:
        document = mongo.retrieve_analysis(analysis_id)
        if document:
            return jsonify(document['data'])
        else:
            return jsonify({'error': 'Analysis not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/get-historical-data')
def get_historical_data():
    documents = mongo.retrieve_all_results()
    return jsonify(documents)


@app.route('/upload', methods=['POST'])
def upload():
    # if 'collection_name' not in request.collection_name:
    #     return jsonify({'error': 'No file part in the request'})
    # print(request.files.collection_name)
    collection_name = request.form.get('collection_name')
    if 'files' not in request.files:
        return jsonify({'error': 'No file part in the request'})

    files = request.files.getlist('files')

    if not files or any(file.filename == '' for file in files):
        return jsonify({'error': 'No selected file'})

    # Ensuring all files are valid
    if not all(file and allowed_file(file.filename) for file in files):
        return jsonify({'error': 'Invalid file type'})

    aggregated_text = ''
    domain_links_count = defaultdict(int)
    file_domains = {}

    for file in files:
        filename = secure_filename(file.filename)
        os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        with open(file_path, 'r', encoding='utf-8') as file_content:
            content = file_content.read()

        soup = BeautifulSoup(content, 'html.parser')
        aggregated_text += soup.get_text() + " "

        for link in soup.find_all('a', href=True):
            url = link['href']
            domain = urlparse(url).netloc
            if domain: 
                domain_links_count[domain] += 1

    sentiment = analyze_sentiment(aggregated_text)
    keywords = extract_keywords(aggregated_text)
    score = calculate_score(sentiment, len(keywords))

    sorted_domain_links = dict(sorted(domain_links_count.items(), key=lambda x: x[1], reverse=True))

    results = {
        'files': [secure_filename(file.filename) for file in files],
        'sentiment': sentiment,
        'keywords': keywords,
        'score': score,
        'upload_date': datetime.now().isoformat(),
        'domain_links': sorted_domain_links,
    }

    print(results)
    mongo.insert_result(results, collection_name)  
    return jsonify(results)

def calculate_score(sentiment, num_keywords):
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
