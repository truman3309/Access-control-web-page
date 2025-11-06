// === 導航切換 ===
document.querySelectorAll('.nav-links a[data-page]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const pageId = link.getAttribute('data-page');

    // 切換 active 樣式
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    link.classList.add('active');

    // 顯示對應頁面
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
  });
});

// === 模擬取得 UID 資料 ===
async function fetchUID() {
  const uidEl = document.getElementById('lastUID');
  const statusEl = document.getElementById('statusText');

  try {
    statusEl.textContent = "連線中...";
    statusEl.className = "status waiting";

    // 這裡可以改成實際後端 API
    // const res = await fetch("https://你的伺服器/get-last-uid");
    // const data = await res.json();

    // 模擬 API 回傳
    await new Promise(r => setTimeout(r, 1000));
    const data = { uid: "04A3B7C129" };

    uidEl.textContent = data.uid;
    statusEl.textContent = "資料同步成功";
    statusEl.className = "status connected";
  } catch (err) {
    uidEl.textContent = "未讀取";
    statusEl.textContent = "連線錯誤";
    statusEl.className = "status error";
  }
}

// === 綁定按鈕 ===
document.getElementById('refreshUID').addEventListener('click', fetchUID);
document.addEventListener('DOMContentLoaded', fetchUID);

// === 按鈕事件 ===
document.getElementById('learnMore').addEventListener('click', () => {
  document.querySelector('[data-page="intro"]').click();
});
document.addEventListener("DOMContentLoaded", () => {
  const loginLink = document.querySelector(".login-link"); // 導覽列登入按鈕
  const nameDisplay = document.getElementById("userNameDisplay"); // 使用者名稱顯示區
  const userName = localStorage.getItem("userName"); // 從 localStorage 取得登入名稱

  if (userName) {
    // ✅ 已登入 → 顯示名稱、隱藏登入按鈕
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
        window.location.href = "個人資料.html";
      });
    }
  } else {
    // ❌ 未登入 → 顯示登入按鈕，隱藏名稱
    if (loginLink) loginLink.style.display = "inline";
    if (nameDisplay) nameDisplay.style.display = "none";
  }
});
