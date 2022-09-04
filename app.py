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
    file = open('static/dots/network_10.dot', 'r')
    graph = file.read()
    return render_template('dot_example.html', graph=" '{}'".format(graph))

if __name__ == '__main__':
    app.run()
