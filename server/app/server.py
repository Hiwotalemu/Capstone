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
import string
import spacy

app = Flask(__name__)
CORS(app, origins="http://localhost:3000")



# @app.route('/')
# def index():
#     return 'Hello, this is the root route!'

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'txt', 'html'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER



def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/upload', methods=['POST'])
def upload():
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

        with open(file_path, 'r') as url_file:
            urls = url_file.read().splitlines()

        # results = []
        # for url in urls:
        #     headlines, content = scrape_webpage(url)
        #     print("Content:", content)
        # if content is not None:
        #     sentiment = analyze_sentiment(content)
        #     keywords = extract_keywords(content)
        #     results.append({'url': url, 'headlines': headlines, 'content': content, 'sentiment': sentiment, 'keywords': keywords})

        # return jsonify(results)
            return jsonify("sucess!")
    
    else:
        return jsonify({'error': 'Invalid file type'})



@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == "__main__":
    app.run(debug=True)


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

