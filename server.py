# server.py
# 使用 Python 內建的 HTTP 伺服器，快速架設靜態網站

import http.server
import socketserver

PORT = 8080  # 可以改成 8000、5000 之類的

# 建立 HTTP Handler
Handler = http.server.SimpleHTTPRequestHandler

# 啟動伺服器
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"🚀 伺服器啟動成功：http://localhost:{PORT}")
    print("按下 Ctrl + C 可停止伺服器")
    httpd.serve_forever()
