from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import mysql.connector

app = Flask(__name__, template_folder="templates", static_folder="static")
CORS(app)

# ---- MySQL Connection ----
db = mysql.connector.connect(
    host="127.0.0.1",
    user="root",
    password="Chaithanya@2003",   # <-- your MySQL password
    database="login_system"
)
cursor = db.cursor(dictionary=True)

# Serve existing login page
@app.route('/')
def index():
    return render_template('practice.html')

# Login API
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    print("Login received:", data)
    email = data.get('email')
    password = data.get('password')

    cursor.execute("SELECT * FROM users WHERE email=%s AND password=%s", (email, password))
    user = cursor.fetchone()
    if user:
        return jsonify({"status": "success", "user": {"name": user['name'], "email": user['email']}})
    else:
        return jsonify({"status": "error", "message": "Invalid email or password"})

# Register API
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    print("Register received:", data)
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    # validation basic
    if not name or not email or not password:
        return jsonify({"status": "error", "message": "All fields are required"})

    # Check existing user
    cursor.execute("SELECT * FROM users WHERE email=%s", (email,))
    existing = cursor.fetchone()
    if existing:
        return jsonify({"status": "error", "message": "Email already exists"})

    # Insert user
    cursor.execute("INSERT INTO users (name, email, password) VALUES (%s, %s, %s)", (name, email, password))
    db.commit()

    return jsonify({"status": "success", "message": "User registered successfully"})

if __name__ == '__main__':
    app.run(debug=True)
