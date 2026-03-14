let btnLogout = document.getElementById("btnLogout");
btnLogout.addEventListener("click", function () {
  // 1. Click đăng xuất thì set lại isLogin = false trong localstorage
  localStorage.setItem("isLogin", false);
  alert("Đăng xuất thành công.");
  window.location.href = "../index.html";
});

document.addEventListener("DOMContentLoaded", function () {
  let isLogin = localStorage.getItem("isLogin");
  if (isLogin === "false") {
    window.location.href = "../index.html";
  }
});
