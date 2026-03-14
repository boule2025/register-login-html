// Functions
// 1. function expression(biểu thức hàm)
// 2. arrow function (hàm mũi tên trong ES6)

// Get cái gì thì return cái đó
let getUserList = function () {
  // Lấy được danh sách tài khoản nằm ở trên local storage (phía trình duyệt của người dùng)
  // Nếu không lấy được userList (tức nó bằng null) thì gán mảng rỗng cho biến userList
  let userList = JSON.parse(localStorage.getItem("userList")) || []; // danh sách người dùng
  return userList;
};

let isEmailExisted = function (email) {
  let userList = getUserList();
  let length = userList.length; // độ dài của mảng
  for (let i = 0; i < length; i++) {
    if (userList[i].email === email) {
      return true;
    }
  }
  return false;
};

// Hàm kiểm tra xem có ký tự viết hoa hay không?
let hasUppercase = function (str) {
  for (let i = 0; i < str.length; i++) {
    if (str[i] >= "A" && str[i] <= "Z") {
      return true;
    }
  }
  return false;
};

let hasLowercase = function (str) {
  for (let i = 0; i < str.length; i++) {
    if (str[i] >= "a" && str[i] <= "z") {
      return true;
    }
  }
  return false;
};

let hasDigit = function (str) {
  for (let i = 0; i < str.length; i++) {
    if (str[i] >= "0" && str[i] <= "9") {
      return true;
    }
  }
  return false;
};

let hasSpecialChar = function (str) {
  for (let i = 0; i < str.length; i++) {
    if (!hasUppercase(str[i]) && !hasLowercase(str[i]) && !hasDigit(str[i])) {
      return true;
    }
  }
  return false;
};

// Kiểm tra độ mạnh mật khẩu
let checkPassStrength = function (password) {
  // độ dài ít nhất là 6 ký tự
  let length = password.length;

  if (
    length >= 6 &&
    hasLowercase(password) &&
    hasUppercase(password) &&
    hasDigit(password) &&
    hasSpecialChar(password)
  ) {
    return true;
  } else {
    return false;
  }
};

let registerEventHandler = function () {
  // 1. Email không được trùng với danh sách đã có trên hệ thống

  let txtEmail = document.getElementById("txtEmail");
  if (isEmailExisted(txtEmail.value.trim().toLowerCase()) === true) {
    alert("Email này đã được sử dụng. Vui lòng điền email khác!");
  } else {
    let txtPassword = document.getElementById("txtPassword");
    let txtRetypePassword = document.getElementById("txtRetypePassword");
    if (txtPassword.value !== txtRetypePassword.value) {
      alert("Mật khẩu không trùng khớp. Vui lòng kiểm tra lại!");
    } else {
      let isPassStrength = checkPassStrength(txtPassword.value);
      if (isPassStrength === false) {
        alert(`Mật khẩu phải có:
            1. Ký tự viết hoa
            2. Ký tự viết thường
            3. Chữ số 0 - 9
            4. Ký tự đặc biệt
            5. Tối thiểu 6 ký tự
            Vui lòng nhập lại mật khẩu!`);
      } else {
        // Lưu thông tin đăng ký của người dùng vào 1 cái array (mảng) và lưu xuống localstorage (lưu tạm trên máy tính người dùng)
        let userList = getUserList();
        let user = {
          email: txtEmail.value.trim().toLowerCase(),
          password: txtPassword.value,
        }; // object (đối tượng)

        // console.log(` email là ${user.email}`);
        // console.log(` password là ${user.password}`);

        // Thêm đối tượng user vào vị trí cuối mảng userList
        userList.push(user);

        localStorage.setItem("userList", JSON.stringify(userList));

        // console.log(JSON.parse(localStorage.getItem("userList")));
        alert("Đăng ký tài khoản thành công.");
        window.location.href = "./index.html";
      }
    }
  }
};

// End functions

/**
 * Làm sao để biết khi nào người dùng click vào nút đăng ký?
 * => thông qua event listener (thằng chuyên lắng nghe sự kiện)
 * tức là phải gắn event listener cho cái nút đăng ký
 */
let btnRegister = document.getElementById("btnRegister");
btnRegister.addEventListener("click", registerEventHandler); // call back function chuyên đi xử lý khi có 1 sự kiện click được diễn ra
