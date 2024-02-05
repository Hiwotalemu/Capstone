from flask import Flask
#request, jsonify


app = Flask(__name__)

#@app.route("/extract", methods=['POST'])
@app.route("/extract")
def extract():
    #data = request.get_json()
    return {"extract" : ["input your Url", "down below"]}
    #return jsonify({ "message": "Data Extracted"})
#extracting 

#def anaylsis():
    
    #data = request.get_json()

    #return jsonify({ "message": "Analyzing data"})
#analyaze 

if __name__ == "__main__": 
    app.run(debug=True)


    #run using python3 server.py