// =======================
// REGISTER
// =======================
function register() {
  const regUsername = document.getElementById("regUsername").value;
  const regPassword = document.getElementById("regPassword").value;

  if (regUsername.trim() === "" || regPassword.trim() === "") {
    alert("Isi semua field");
    return;
  }

  const user = {
    username: regUsername,
    password: regPassword
  };

  localStorage.setItem("user", JSON.stringify(user));

  alert("Register berhasil");

  showLogin();
}

// =======================
// LOGIN
// =======================
function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const savedUser = JSON.parse(localStorage.getItem("user"));

  if (!savedUser) {
    alert("User belum terdaftar");
    return;
  }

  if (
    username === savedUser.username &&
    password === savedUser.password
  ) {

    localStorage.setItem("isLogin", "true");
    localStorage.setItem("username", username);

    document.getElementById("loginPopup").style.display = "none";

    alert("Login berhasil");

    loadProfile();

  } else {
    alert("Username atau password salah");
  }
}

// =======================
// LOGOUT
// =======================
function logout() {
  localStorage.removeItem("isLogin");
  localStorage.removeItem("username");

  alert("Logout berhasil");

  location.reload();
}

// =======================
// ADD TO CART
// =======================
function addToCart(product) {

  const isLogin = localStorage.getItem("isLogin");

  if (isLogin !== "true") {
    alert("Please login first");
    window.location.href = "../profile.html";
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push(product);

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Produk berhasil ditambahkan");
}

// =======================
// LOAD PROFILE
// =======================
function loadProfile() {

  const isLogin = localStorage.getItem("isLogin");
  const username = localStorage.getItem("username");

  const profileInfo = document.getElementById("profileInfo");
  const cartList = document.getElementById("cartList");

  if (!profileInfo) return;

  if (isLogin === "true") {

    profileInfo.innerHTML = `
      <div class="flex items-center justify-between w-full">
        <div>
          <h3 class="text-2xl font-bold">
            Halo, ${username}
          </h3>
          <p class="text-gray-500">
            Welcome to your account
          </p>
        </div>

        <button
          onclick="logout()"
          class="bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>
    `;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    cartList.innerHTML = "";

    if (cart.length === 0) {

      cartList.innerHTML = `
        <p class="text-gray-500">
          Cart masih kosong
        </p>
      `;

    } else {

      cart.forEach((item) => {

        cartList.innerHTML += `
          <div class="bg-white rounded-xl p-4 shadow">
            <img
              src="${item.image}"
              class="w-full h-48 object-cover rounded-lg mb-3"
            >

            <h4 class="font-bold text-lg">
              ${item.name}
            </h4>

            <p class="text-gray-500">
              Rp ${item.price}
            </p>
          </div>
        `;
      });
    }

  } else {

    document.getElementById("loginPopup").style.display = "flex";
  }
}

// =======================
// SWITCH FORM
// =======================
function showRegister() {

  document.getElementById("loginForm").style.display = "none";

  document.getElementById("registerForm").style.display = "block";
}

function showLogin() {

  document.getElementById("loginForm").style.display = "block";

  document.getElementById("registerForm").style.display = "none";
}