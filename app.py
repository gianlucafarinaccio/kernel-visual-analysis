import json

from flask import Flask, render_template, request

app = Flask(__name__)


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
    return render_template('dot_example.html', graph='"{}"'.format(graph))


# This route show an example of kmallocx function imported by a .DOT file
# The string which contain the file data is stored inside the
# template's variable 'graph'
@app.route('/kmallocx')
def kmallocx():
    file = open('static/dots/kmallocx_adpt.dot', 'r')
    graph = file.read()
    return render_template('dot_example2.html', graph=' "{}"'.format(graph))


@app.route('/physics')
def physics():
    file = open('static/dots/kmallocx_adpt.dot', 'r')
    graph = file.read()
    file.close()
    return render_template('physics.html', graph=' "{}"'.format(graph))


# Function for storing positions of nodes and edges into a locale .JSON file
@app.route('/store', methods=["POST"])
def storeData():
    #MEMO:
    #       .dumps(input_dict, output_file) -> convert a python dict into JSON String and save into file
    #       request.get_data() -> return bytes obj
    #       request.get_json() -> return python dict

    jsonString = request.get_data() #get the data received
    with open('static/data/positions.json', 'wb') as json_file: # 'wb' mode for write bytes instead of string
        json_file.write(jsonString)
    return {'response' : 'data received :)'}


#Function for retrieve positions of nodes and edges saved previously
@app.route('/retrieve', methods=["GET"])
def retrieveData():

    with open('static/data/positions.json', 'rb') as json_file: # 'rb' mode for read bytes instead of string
        return json_file.read(),{'Content-Type': 'application/json'}

if __name__ == '__main__':
    app.run()
