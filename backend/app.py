from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
from datetime import datetime
import os
from datetime import datetime, timezone


# Load environment variables
load_dotenv()

app = Flask(__name__, static_folder='../frontend', static_url_path='/')
CORS(app)

# MongoDB connection
try:
    mongo_uri = os.getenv("MONGO_URI")
    db_name = os.getenv("DB_NAME", "interactive_resume")
    client = MongoClient(mongo_uri)
    db = client[db_name]
    collection = db['contacts']
except Exception as e:
    print(f"❌ MongoDB connection error: {e}")
    collection = None

# Serve index.html
@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')

# Serve static frontend files
@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory(app.static_folder, path)

# API to handle contact form
@app.route('/send-message', methods=['POST'])
def send_message():
    if collection is None:
        return jsonify({"error": "Database connection failed"}), 500
    
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

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
