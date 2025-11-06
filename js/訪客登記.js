const API_BASE_URL = "http://localhost:3000"; // 之後改成你的伺服器網址
const API_KEY = "a53d580a-b888-479c-a594-7687c7629285"; // 請改放在後端

document.getElementById("visitorForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("visitorName").value.trim();
  const uid = document.getElementById("visitorID").value.trim();
  const messageBox = document.getElementById("visitorMessage");

  messageBox.className = "message hidden"; // reset
  messageBox.textContent = "";

  if (!name || !uid) {
    showMessage("請輸入完整資料！", "error");
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/register-visitor`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
      body: JSON.stringify({ name, uid }),
    });

    const result = await response.json();

    if (response.ok) {
      showMessage(result.message || "預約成功！", "success");
      document.getElementById("visitorForm").reset();
    } else {
      showMessage(result.error || "預約失敗，請重試！", "error");
    }
  } catch (err) {
    console.error("Error:", err);
    showMessage("無法連接伺服器，請稍後再試。", "error");
  }
});

function showMessage(text, type) {
  const msg = document.getElementById("visitorMessage");
  msg.textContent = text;
  msg.className = `message ${type}`;
}
