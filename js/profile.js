// === 模擬從後端取得登入使用者資料 ===
document.addEventListener("DOMContentLoaded", () => {
  // 從 localStorage 抓使用者資料
  const userName = localStorage.getItem("userName");
  const lastLogin = localStorage.getItem("lastLogin");

  // 模擬其餘資料
  const userData = {
    name: userName || "",
    email: userName ? `${userName.toLowerCase()}@example.com` : "",
    role: userName ? "管理員" : "",
    lastLogin: lastLogin || "",
  };

  // 顯示在畫面上
  document.getElementById("userName").textContent = userData.name
    ? `使用者名稱：${userData.name}`
    : "";
  document.getElementById("userEmail").textContent = userData.email
    ? `信箱：${userData.email}`
    : "";
  document.getElementById("userRole").textContent = userData.role
    ? `角色：${userData.role}`
    : "";
  document.getElementById("lastLogin").textContent = userData.lastLogin
    ? `上次登入時間：${userData.lastLogin}`
    : "";
});

// === 修改資料按鈕 ===
function editProfile() {
  alert("修改資料功能尚未開放！");
}

// === 修改密碼按鈕 ===
function changePassword() {
  alert("修改密碼功能尚未開放！");
}

// === 登出功能 ===
function logout() {
  const confirmLogout = confirm("是否確定要登出？");
  if (confirmLogout) {
    localStorage.removeItem("userName");
    localStorage.removeItem("lastLogin");
    alert("您已成功登出！");
    window.location.href = "登入.html";
  }
}
