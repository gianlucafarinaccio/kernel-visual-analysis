import json

from flask import Flask, render_template, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'application/json'


@app.route('/')
def hello_world():  # put application's code here
    return render_template('index.html')


# This route show an example of graph imported by a .DOT file
# The string which contain the file data is stored inside the
# template's variable 'graph'
@app.route('/dot')
def dot():
    file = open('static/dots/network_100.dot', 'r')
    graph = file.read()
    file.close()
    return render_template('dot_example.html', graph='"{}"'.format(graph))


# This route show an example of kmallocx function imported by a .DOT file
# The string which contain the file data is stored inside the
# template's variable 'graph'
@app.route('/kmallocx')
def kmallocx():
    file = open('static/dots/kmallocx_adpt.dot', 'r')
    graph = file.read()
    file.close()
    return render_template('dot_example2.html', graph=' "{}"'.format(graph))


@app.route('/cluster')
def cluster():
    return render_template('cluster.html')



@app.route('/physics')
def physics():
    file = open('static/dots/kmallocx_adpt.dot', 'r')
    graph = file.read()
    file.close()
    return render_template('physics.html', graph=' "{}"'.format(graph))


# Function for storing positions of nodes and edges into a local .JSON file
@app.route('/store', methods=["POST"])
def storeData():
    #MEMO:
    #       json.dump(input_dict, output_file) -> convert a python dict into JSON and save into file
    #       str = json.dumps(input_dict) -> converto a python dict into a JSON string and return it
    #       request.get_data() -> return bytes obj
    #       request.get_json() -> return python dict

    dict = request.get_json() #get the data received
    with open('static/data/positions.json', 'w') as json_file: # 'wb' mode for write bytes instead of string
        json.dump(dict, json_file, indent = 2) # convert the python dict into a json 
    return {'response' : 'data received :)'}


#Function for retrieve positions of nodes and edges saved previously
@app.route('/retrieve', methods=["GET"])
def retrieveData():

    with open('static/data/positions.json', 'r') as json_file: # 'rb' mode for read bytes instead of string
        return json_file.read(),{'Content-Type': 'application/json'}

if __name__ == '__main__':
    app.run()
