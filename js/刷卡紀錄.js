// === 登入狀態檢查（共用功能列） ===
document.addEventListener("DOMContentLoaded", () => {
  const loginLink = document.querySelector(".login-link");
  const nameDisplay = document.getElementById("userNameDisplay");
  const userName = localStorage.getItem("userName");

  if (userName) {
    // 已登入 → 顯示名稱
    loginLink.style.display = "none";
    nameDisplay.textContent = userName;
    nameDisplay.style.display = "inline";

    // 點擊名稱 → 進入個人基本資料頁
    nameDisplay.addEventListener("click", () => {
      window.location.href = "個人基本資料.html";
    });
  } else {
    // 未登入 → 顯示登入按鈕
    loginLink.style.display = "inline";
    nameDisplay.style.display = "none";
  }
});

// === 模擬即時刷卡事件 ===
document.addEventListener("DOMContentLoaded", () => {
  const statusArea = document.getElementById("statusArea");
  const recordBody = document.getElementById("recordBody");

  // 模擬每 5 秒新增一筆刷卡資料
  setInterval(() => {
    const uid = randomUID();
    const now = new Date().toLocaleString("zh-TW", { hour12: false });
    const status = Math.random() > 0.5 ? "通過" : "拒絕";

    // 更新即時狀態
    statusArea.textContent = `卡號：${uid}　狀態：${status}　時間：${now}`;

    // 新增一筆紀錄
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${uid}</td>
      <td>${now}</td>
      <td>${status}</td>
    `;
    recordBody.prepend(newRow);
  }, 5000);
});

