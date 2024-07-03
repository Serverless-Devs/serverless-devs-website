from flask import Flask, send_from_directory
import os

app = Flask(__name__, static_folder='dist')

@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_static_files(path):
    full_path = os.path.join(app.static_folder, path)
    if os.path.isdir(full_path):
        return send_from_directory(full_path, 'index.html')
    else:
        return send_from_directory(app.static_folder, path)

@app.errorhandler(404)
def page_not_found(error):
    return send_from_directory(app.static_folder, '404.html'), 404

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=9000)