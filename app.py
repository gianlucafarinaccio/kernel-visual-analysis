from flask import Flask, render_template
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
    return render_template('dot_example.html', graph= '"{}"'.format(graph))


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
    file = open('static/positionsData.json', 'r')
    positions = file.read()
    return render_template('physics.html', graph=' "{}"'.format(graph),positions = positions )

@app.route('/getPositions/<string:data>', methods=['POST'])
def getData(data):
    file = open('static/positionsData.json', 'w')
    file.write(data)

if __name__ == '__main__':
    app.run()
