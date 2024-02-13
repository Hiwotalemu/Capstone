import os
from flask import Flask, request, jsonify
import zipfile
from bs4 import BeautifulSoup
from transformers import pipeline

app = Flask(__name__)


ner_model = pipeline("ner")
phrases = ["I believe", "man's achievements", "mankind"]

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'})
    if file.filename.endswith('.html'):
        return analyze_html_file(file)
    else:
        return jsonify({'error'})
    


def analyze_html_file(html_file):
    try:

        html_content = html_file.read()
        parser = BeautifulSoup(html_content, 'html.parser')

        text_content = parser.get_text()

#LLM PART
        # bias_results = sentiment_model(text_content)

        # return jsonify({'success': True, 'bias_results': bias_results})
       
    except Exception as e:
        return jsonify({'error': f'Error analyzing HTML file: {str(e)}'})

    #return jsonify({ "message": "Analyzing data"})
#analyaze 
def analyze_html_files(html_file):
   # try:
           
        html_content = html_file.read()
        parser = BeautifulSoup(html_content, 'html.parser')
        text_content = parser.get_text()
#LLM PART
    #     analysis_result = ner_model(text_content)
    #     return jsonify({'success': True, 'bias_results': analysis_result})
    # except Exception as e:
    #     return jsonify({'error': f'Error analyzing HTML file: {str(e)}'})

  

if __name__ == "__main__": 
    app.run(debug=True)


    #run using python3 server.py