// === 🟢 登入驗證功能 ===
function handleLogin(event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const msg = document.getElementById("loginMessage");

  msg.className = "message";

  if (!username || !password) {
    msg.textContent = "請輸入完整的登入資訊。";
    msg.classList.add("error");
    return false;
  }

  // === 模擬登入驗證 ===
  if (username === "admin" && password === "1234") {
    msg.textContent = "登入成功，正在跳轉...";
    msg.classList.add("success");

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
  const nameDisplay = document.getElementById("userNameDisplay"); // 使用者名稱顯示區
  const userName = localStorage.getItem("userName"); // 從 localStorage 抓登入名稱

  if (userName) {
  // ✅ 已登入：顯示名稱、隱藏登入按鈕
  if (loginLink) loginLink.style.display = "none";

  if (nameDisplay) {
    nameDisplay.textContent = userName;
    nameDisplay.style.display = "inline";
    nameDisplay.style.color = "#ffdf5d";
    nameDisplay.style.fontWeight = "bold";
    nameDisplay.style.cursor = "pointer";
    nameDisplay.title = "查看個人資料 / 登出";

    // === 🧩 點擊名稱邏輯 ===
    let firstClick = true; // 第一次點擊 → 進入個人資料
    nameDisplay.addEventListener("click", () => {
      if (firstClick) {
        window.location.href = "個人基本資料.html";
        firstClick = false;

        // 三秒內再次點擊才會顯示登出確認
        setTimeout(() => {
          firstClick = true;
        }, 3000);
      } else {
        const confirmLogout = confirm(`是否要登出帳號「${userName}」？`);
        if (confirmLogout) {
          localStorage.removeItem("userName");
          alert("您已成功登出！");
          window.location.href = "登入.html";
        }
      }
    });
  }
} else {
  if (loginLink) loginLink.style.display = "inline";
  if (nameDisplay) nameDisplay.style.display = "none";
}


});
