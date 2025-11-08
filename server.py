from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import bcrypt

# === 建立 Flask 伺服器 ===
app = Flask(__name__)
CORS(app)  # 允許前端請求

# === 連接資料庫 ===
try:
    db = mysql.connector.connect(
        host="localhost",
        user="root",
        password="****",       # 你的密碼
        database="my_database",    # 你的資料庫
        charset="utf8mb4"
    )
    cursor = db.cursor(dictionary=True)
    print("✅ 已成功連接 MySQL 資料庫")
except mysql.connector.Error as err:
    print(f"❌ 資料庫連線失敗: {err}")

# === 註冊帳號 API ===
@app.route("/Access-control-web-page/html/註冊.html", methods=["POST"])
def register():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"status": "error", "message": "請輸入完整的資料"}), 400

    # 檢查是否已存在
    cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
    existing = cursor.fetchone()
    if existing:
        return jsonify({"status": "error", "message": "此帳號已被註冊"}), 400

    # 加密密碼再存入資料庫
    hashed = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
    cursor.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (username, hashed))
    db.commit()

    return jsonify({"status": "success", "message": "註冊成功！"}), 200

# === 測試用 API ===
@app.route("/users", methods=["GET"])
def get_users():
    cursor.execute("SELECT id, username, created_at FROM users")
    users = cursor.fetchall()
    return jsonify(users)

# === 啟動伺服器 ===
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=1100, debug=True)
