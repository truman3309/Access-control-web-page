// 模擬從後端取得登入使用者資料
document.addEventListener("DOMContentLoaded", () => {
  const userData = {
    name: "測試用帳號",
    email: "kgeokwoprkth@example.com",
    role: "管理員",
    lastLogin: "2025-10-29 10:00",
  };

  // 顯示在畫面上
  document.getElementById("userName").textContent = `使用者名稱：${userData.name}`;
  document.getElementById("userEmail").textContent = `信箱：${userData.email}`;
  document.getElementById("userRole").textContent = `角色：${userData.role}`;
  document.getElementById("lastLogin").textContent = `上次登入時間：${userData.lastLogin}`;
});

// 修改資料按鈕
function editProfile() {
  alert(" 修改資料功能尚未開放！");
}

// 修改密碼按鈕
function changePassword() {
  alert(" 修改密碼功能尚未開放！");
}

// 登出功能
function logout() {
  alert("您已成功登出！");
  window.location.href = "登入.html";
}
