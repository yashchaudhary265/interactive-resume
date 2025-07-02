import os
import certifi
import requests
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
from datetime import datetime, timezone

load_dotenv()

app = Flask(__name__, static_folder="../frontend", static_url_path='/')
CORS(app)

# 🔐 Environment Variables
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# 🤖 Gemini AI Endpoint
@app.route('/generate-ai', methods=['POST'])
def generate_ai():
    try:
        data = request.get_json()
        prompt = data.get('prompt', '')

        print("🔐 GEMINI_API_KEY:", GEMINI_API_KEY)
        print("🧠 Prompt received:", prompt)

        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={GEMINI_API_KEY}"
        headers = { "Content-Type": "application/json" }
        body = {
            "contents": [
                {
                    "parts": [
                        {"text": prompt}
                    ]
                }
            ]
        }

        response = requests.post(url, headers=headers, json=body)
        response_json = response.json()
        print("📦 Gemini response:", response_json)

        if "candidates" in response_json:
            ai_text = response_json["candidates"][0]["content"]["parts"][0]["text"]
            return jsonify({"generatedText": ai_text})
        else:
            return jsonify({"error": response_json.get("error", "No candidates returned")}), 500

    except Exception as e:
        print("❌ Gemini Error:", str(e))
        return jsonify({"error": f"Exception: {str(e)}"}), 500

# 📦 MongoDB connection
def get_collection():
    mongo_uri = os.getenv("MONGO_URI")
    db_name = os.getenv("DB_NAME", "interactive_resume")
    client = MongoClient(mongo_uri, tls=True, tlsCAFile=certifi.where())
    db = client[db_name]
    return db['contacts']

# 🏠 Serve homepage (contact.html or index.html)
@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'contact.html')  # or 'index.html' if named that

# 📁 Serve other frontend files
@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory(app.static_folder, path)

# 📬 Contact form submission
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

# 🚀 Run server locally
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
