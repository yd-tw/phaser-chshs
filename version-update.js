function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

// 設定Cookie的函數
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = `${name}=${value}; ${expires}; path=/`;
}

// 檢查是否需要顯示更新通知
const latestVersion = 'beta 0.3.0';
const lastVersionNotified = getCookie('lastVersionNotified');

// 顯示更新通知的條件
if (lastVersionNotified !== latestVersion) {
  document.getElementById('update-notification').style.display = 'block';
}

// "關閉"按鈕的處理
document.getElementById('close-button').addEventListener('click', function() {
  setCookie('lastVersionNotified', latestVersion, 365); // 設定為已通知此版本
  document.getElementById('update-notification').style.display = 'none';
});