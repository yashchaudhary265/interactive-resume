import os
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import mysql.connector
from dotenv import load_dotenv

# load .env (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME)
load_dotenv()

app = Flask(
    __name__,
    static_folder="../frontend",  # adjust if your folder structure differs
    static_url_path=""            # serve static files at root
)
CORS(app)


@app.route("/", methods=["GET"])
def serve_index():
    # serve your main index.html
    return send_from_directory(app.static_folder, "index.html")


@app.route("/<path:path>")
def serve_static(path):
    # serve CSS, JS, images, etc.
    return send_from_directory(app.static_folder, path)


@app.route("/api/message", methods=["POST"])
def receive_message():
    """
    Accepts JSON { name, email, subject, message }
    and inserts into MySQL `messages` table.
    """
    data = request.get_json(force=True)
    name    = data.get("name")
    email   = data.get("email")
    subject = data.get("subject")
    message = data.get("message")

    if not all([name, email, message]):
        return jsonify({ "status": "error", "message": "Missing required fields." }), 400

    try:
        conn = mysql.connector.connect(
            host     = os.getenv("DB_HOST"),
            user     = os.getenv("DB_USER"),
            password = os.getenv("DB_PASSWORD"),
            database = os.getenv("DB_NAME")
        )
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO messages (name, email, subject, message) VALUES (%s, %s, %s, %s)",
            (name, email, subject, message)
        )
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({ "status": "success" }), 201

    except Exception as e:
        return jsonify({ "status": "error", "message": str(e) }), 500


@app.route("/api/messages", methods=["GET"])
def list_messages():
    """
    Returns all saved messages as JSON.
    """
    try:
        conn = mysql.connector.connect(
            host     = os.getenv("DB_HOST"),
            user     = os.getenv("DB_USER"),
            password = os.getenv("DB_PASSWORD"),
            database = os.getenv("DB_NAME")
        )
        cursor = conn.cursor(dictionary=True)
        cursor.execute("""
            SELECT id, name, email, subject, message, timestamp
              FROM messages
             ORDER BY timestamp DESC
        """)
        rows = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify(rows), 200

    except Exception as e:
        return jsonify({ "status": "error", "message": str(e) }), 500


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)

