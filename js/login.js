function handleLogin(event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const msg = document.getElementById("loginMessage");

  msg.className = "message"; // reset

  if (!username || !password) {
    msg.textContent = "請輸入完整的登入資訊。";
    msg.classList.add("error");
    return false;
  }

  // 模擬登入驗證（未串接後端時可用）
  if (username === "admin" && password === "1234") {
    msg.textContent = "登入成功，正在跳轉...";
    msg.classList.add("success");
    setTimeout(() => {
      window.location.href = "../html/主頁.html"; // 成功後導向首頁
      msg.textContent = "用戶名稱:測試帳號，成功登入";
    }, 1000);
  } else {
    msg.textContent = "帳號或密碼錯誤，請重新輸入。";
    msg.classList.add("error");
  }

  return false;
}
