// === 🟢 登入驗證功能 ===
function handleLogin(event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const msg = document.getElementById("loginMessage");

  // 重置提示樣式
  msg.className = "message";

  // 檢查是否填寫完整
  if (!username || !password) {
    msg.textContent = "請輸入完整的登入資訊。";
    msg.classList.add("error");
    return false;
  }

  // === 模擬登入驗證（未串接後端時可用） ===
  if (username === "admin" && password === "1234") {
    msg.textContent = "登入成功，正在跳轉...";
    msg.classList.add("success");

    // 延遲跳轉（模擬載入）
    setTimeout(() => {
      // 儲存登入者名稱到 localStorage
      localStorage.setItem("userName", username);

      // 跳轉到主頁
      window.location.href = "../html/主頁.html";
    }, 1000);
  } else {
    msg.textContent = "帳號或密碼錯誤，請重新輸入。";
    msg.classList.add("error");
  }

  return false;
}

// === 🟡 登入狀態檢查與顯示名稱（主頁共用） ===
document.addEventListener("DOMContentLoaded", () => {
  const loginLink = document.querySelector(".login-link"); // 導覽列登入按鈕
  const nameDisplay = document.getElementById("userNameDisplay"); // 顯示使用者名稱的 <span>
  const userName = localStorage.getItem("userName"); // 抓取登入使用者名稱

  if (userName) {
    // ✅ 已登入：顯示名稱、隱藏登入按鈕
    if (loginLink) loginLink.style.display = "none";
    if (nameDisplay) {
      nameDisplay.textContent = userName;
      nameDisplay.style.display = "inline";
      nameDisplay.style.color = "#ffdf5d";
      nameDisplay.style.fontWeight = "bold";
      nameDisplay.style.cursor = "pointer";
      nameDisplay.title = "查看個人資料";

      // 點擊名稱 → 進入個人資料頁面
      nameDisplay.addEventListener("click", () => {
        window.location.href = "個人基本資料.html";
      });
    }
  } else {
    // ❌ 未登入：顯示登入按鈕，隱藏名稱
    if (loginLink) loginLink.style.display = "inline";
    if (nameDisplay) nameDisplay.style.display = "none";
  }
});
