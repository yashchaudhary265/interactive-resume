from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
from datetime import datetime
import os

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)

# MongoDB connection
try:
    mongo_uri = os.getenv("MONGO_URI")
    db_name = os.getenv("DB_NAME", "interactive_resume")  # Optional fallback
    client = MongoClient(mongo_uri)
    db = client[db_name]
    collection = db['contacts']
except Exception as e:
    print(f"❌ Error connecting to MongoDB: {e}")
    collection = None

@app.route('/send-message', methods=['POST'])
def send_message():
    if not collection:
        return jsonify({"error": "Database connection failed"}), 500

    data = request.get_json()

    name = data.get('name')
    email = data.get('email')
    message = data.get('message')

    if not name or not email or not message:
        return jsonify({"error": "All fields are required"}), 400

    contact_data = {
        "name": name,
        "email": email,
        "message": message,
        "timestamp": datetime.utcnow()
    }

    try:
        collection.insert_one(contact_data)
        return jsonify({"success": "Message received!"}), 200
    except Exception as e:
        return jsonify({"error": f"Database error: {str(e)}"}), 500

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
