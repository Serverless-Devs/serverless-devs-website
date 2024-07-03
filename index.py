from flask import Flask, send_from_directory

app = Flask(__name__)

@app.route('/')
def home():
    return send_from_directory('./dist/', 'index.html')

@app.route('/<path:path>')
def static_file(path):
    return send_from_directory('./dist/', path)

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=9000)