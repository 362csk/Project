from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# ---- MySQL Connection ----
db = mysql.connector.connect(
    host="127.0.0.1",
    user="root",
    password="Chaithanya@2003",     # <-- your MySQL password
    database="login_system"         # <-- your database name
)

cursor = db.cursor(dictionary=True)

# ---- API: Login ----
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data['email']
    password = data['password']

    cursor.execute("SELECT * FROM users WHERE email=%s AND password=%s", (email, password))
    user = cursor.fetchone()

    if user:
        return jsonify({
            "status": "success",
            "user": {
                "name": user["name"],
                "email": user["email"]
            }
        })
    else:
        return jsonify({"status": "error", "message": "Invalid email or password"})

if __name__ == "__main__":
    app.run(debug=True)
# ---- API: Register ----
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    name = data['name']
    email = data['email']
    password = data['password']

    # Check if email already exists
    cursor.execute("SELECT * FROM users WHERE email=%s", (email,))
    existing = cursor.fetchone()

    if existing:
        return jsonify({"status": "error", "message": "Email already exists"})

    # Insert new user
    cursor.execute(
        "INSERT INTO users (name, email, password) VALUES (%s, %s, %s)",
        (name, email, password)
    )
    db.commit()

    return jsonify({"status": "success", "message": "User registered successfully!"})
