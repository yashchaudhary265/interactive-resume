from flask import Flask, request, jsonify, send_from_directory, g
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
from datetime import datetime, timezone
import os
import certifi

client = MongoClient(mongo_uri, tls=True, tlsCAFile=certifi.where())

# Load environment variables from .env
load_dotenv()

# Initialize Flask app
app = Flask(__name__, static_folder='../frontend', static_url_path='/')
CORS(app)

# Function to safely get MongoDB collection per worker/request
def get_collection():
    if 'mongo_client' not in g:
        mongo_uri = os.getenv("MONGO_URI")
        db_name = os.getenv("DB_NAME", "interactive_resume")
        g.mongo_client = MongoClient(mongo_uri)
        g.db = g.mongo_client[db_name]
    return g.db['contacts']

# Serve index.html
@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')

# Serve static files from frontend
@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory(app.static_folder, path)

# API to handle contact form
@app.route('/send-message', methods=['POST'])
def send_message():
    try:
        collection = get_collection()
    except Exception as e:
        return jsonify({"error": f"Database connection failed: {e}"}), 500

    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid JSON"}), 400

    name = data.get('name')
    email = data.get('email')
    message = data.get('message')

    if not name or not email or not message:
        return jsonify({"error": "All fields are required"}), 400

    contact_data = {
        "name": name,
        "email": email,
        "message": message,
        "timestamp": datetime.now(timezone.utc)
    }

    try:
        collection.insert_one(contact_data)
        return jsonify({"success": "Message received!"}), 200
    except Exception as e:
        return jsonify({"error": f"Database error: {str(e)}"}), 500

# Run the server
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
