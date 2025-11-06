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


// === 🟡 登入狀態檢查與顯示名稱 ===
document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.querySelector('a[href="登入.html"]'); // 主頁的登入連結
  const queryLink = document.querySelector('a[href="查詢.html"]'); // 查詢連結
  const userName = localStorage.getItem("userName"); // 從 localStorage 抓登入者名稱

  // ✅ 若已登入
  if (userName) {
    // 隱藏登入按鈕
    if (loginBtn) {
      loginBtn.style.display = "none";
    }

    // 在查詢連結後顯示使用者名稱
    if (queryLink) {
      const nameDisplay = document.createElement("a");
      nameDisplay.textContent = userName;
      nameDisplay.classList.add("user-name");
      nameDisplay.href = "個人資料.html";
      nameDisplay.style.marginLeft = "12px";
      nameDisplay.style.fontWeight = "bold";
      nameDisplay.style.color = "#ffdf5d";
      nameDisplay.style.cursor = "pointer";
      nameDisplay.title = "查看個人資料";

      queryLink.insertAdjacentElement("afterend", nameDisplay);
    }
  } else {
    console.log("尚未登入");
  }
});
