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
            if domain:  # This will skip empty domains, which can be from relative URLs
                domain_links_count[domain] += 1

    sentiment = analyze_sentiment(aggregated_text)
    keywords = extract_keywords(aggregated_text)
    score = calculate_score(sentiment, len(keywords))

    results = {
        'files': [secure_filename(file.filename) for file in files],
        'sentiment': sentiment,
        'keywords': keywords,
        'score': score,
        'upload_date': datetime.now().isoformat(),
        'domain_links': dict(domain_links_count),
    }

    print(results)
    mongo.insert_result(results, collection_name)  # Assuming `mongo.insert_result` is a valid method
    return jsonify(results)
#anotehr method for domain where it takes the links from the pulled and saved file and prints the domain dictionary within each itll have 

  #results.append({'url': url, 'headlines': headlines, 'content': content, 'sentiment': sentiment, 'keywords': keywords})
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

