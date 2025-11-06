// ==============================
// main.js － 主頁腳本（穩定版）
// ==============================

document.addEventListener("DOMContentLoaded", () => {
  // === 導航切換（事件委派） ===
  const nav = document.querySelector(".nav-links");
  if (nav) {
    nav.addEventListener("click", (e) => {
      const a = e.target.closest('a[data-page]');
      if (!a) return;

      e.preventDefault();
      const pageId = a.getAttribute("data-page");
      if (!pageId) return;

      // 切換 active 樣式
      nav.querySelectorAll("a").forEach((el) => el.classList.remove("active"));
      a.classList.add("active");

      // 顯示對應頁面
      document.querySelectorAll(".page").forEach((p) => p.classList.remove("active"));
      const targetPage = document.getElementById(pageId);
      if (targetPage) targetPage.classList.add("active");
    });
  }

  // === 綁定按鈕 ===
  const refreshBtn = document.getElementById("refreshUID");
  if (refreshBtn) refreshBtn.addEventListener("click", fetchUID);

  const learnBtn = document.getElementById("learnMore");
  if (learnBtn) {
    learnBtn.addEventListener("click", () => {
      const introLink = document.querySelector('[data-page="intro"]');
      if (introLink) introLink.click();
    });
  }

  // 初始讀取 UID / 登入狀態 UI
  fetchUID();
  updateAuthUI();
});

// === 模擬取得 UID 資料 ===
async function fetchUID() {
  const uidEl = document.getElementById("lastUID");
  const statusEl = document.getElementById("statusText");
  if (!uidEl || !statusEl) return;

  try {
    statusEl.textContent = "連線中...";
    statusEl.className = "status waiting";

    // 這裡可以改成實際後端 API
    // const res = await fetch("https://你的伺服器/get-last-uid");
    // const data = await res.json();

    // 模擬 API 回傳
    await new Promise((r) => setTimeout(r, 800));
    const data = { uid: "04A3B7C129" };

    uidEl.textContent = data.uid;
    statusEl.textContent = "資料同步成功";
    statusEl.className = "status connected";
  } catch (err) {
    uidEl.textContent = "未讀取";
    statusEl.textContent = "連線錯誤";
    statusEl.className = "status error";
    console.error("fetchUID error:", err);
  }
}

// === 登入狀態檢查與顯示名稱 ===
function updateAuthUI() {
  const loginLink = document.querySelector(".login-link");        // 導覽列「登入」按鈕
  const nameDisplay = document.getElementById("userNameDisplay"); // 顯示使用者名稱的 <span>
  const userName = localStorage.getItem("userName");

  // 未配置對應元素就不處理
  if (!loginLink && !nameDisplay) return;

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
      // 避免重複綁定
      nameDisplay.onclick = () => (window.location.href = "個人資料.html");
    }
  } else {
    // ❌ 未登入：顯示登入按鈕，隱藏名稱
    if (loginLink) loginLink.style.display = "inline";
    if (nameDisplay) nameDisplay.style.display = "none";
  }
}
