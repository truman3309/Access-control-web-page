const API_BASE_URL = "http://localhost:3000"; // 之後改成你的後端 URL
let allAccessRecords = [];

document.addEventListener("DOMContentLoaded", async () => {
  await fetchAndDisplayRecords();
  document.getElementById("searchBtn").addEventListener("click", searchRecords);
  document.getElementById("reportBtn").addEventListener("click", generateReport);
});

async function fetchAndDisplayRecords() {
  const tbody = document.querySelector("#recordsTable tbody");
  tbody.innerHTML = `<tr><td colspan="5" class="loading">載入中...</td></tr>`;
  try {
    const res = await fetch(`${API_BASE_URL}/access-records`);
    const data = await res.json();
    allAccessRecords = data;
    displayRecords(data);
  } catch (err) {
    console.error(err);
    tbody.innerHTML = `<tr><td colspan="5" class="loading">無法取得資料 (${err.message})</td></tr>`;
  }
}

function displayRecords(records) {
  const tbody = document.querySelector("#recordsTable tbody");
  tbody.innerHTML = "";

  if (!records.length) {
    tbody.innerHTML = `<tr><td colspan="5">查無紀錄</td></tr>`;
    return;
  }

  records.forEach(r => {
    const name = r.visitor_name || "未登記訪客";
    const row = `
      <tr>
        <td>${name}</td>
        <td>${r.uid}</td>
        <td>${r.time}</td>
        <td>${r.type || "刷卡"}</td>
        <td>${r.status || "正常"}</td>
      </tr>`;
    tbody.innerHTML += row;
  });
}

function searchRecords() {
  const query = document.getElementById("searchQuery").value.toLowerCase();
  const filtered = allAccessRecords.filter(r =>
    (r.visitor_name && r.visitor_name.toLowerCase().includes(query)) ||
    (r.uid && r.uid.toLowerCase().includes(query))
  );
  displayRecords(filtered);
}

function generateReport() {
  const box = document.getElementById("reportContainer");
  const abnormal = allAccessRecords.filter(r => r.status && r.status !== "正常");

  if (!abnormal.length) {
    box.innerHTML = "<p>目前沒有異常事件報告。</p>";
    return;
  }

  let html = "<ul>";
  abnormal.forEach(r => {
    html += `<li><strong>${r.visitor_name || r.uid}</strong>（UID: ${r.uid}）於 ${r.time} 狀態：<span style="color:red">${r.status}</span></li>`;
  });
  html += "</ul>";
  box.innerHTML = html;
}
