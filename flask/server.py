from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    # Process the uploaded file (save it, extract data, etc.)
    # For simplicity, let's just return the filename for now
    return jsonify({'filename': file.filename})

#def anaylsis():
    
    #data = request.get_json()

    #return jsonify({ "message": "Analyzing data"})
#analyaze 

if __name__ == "__main__": 
    app.run(debug=True)


    #run using python3 server.py