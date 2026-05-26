// LOGIN
function login() {
  const username = document.getElementById("username").value;

  if (username.trim() === "") {
    alert("Masukkan username");
    return;
  }

  localStorage.setItem("isLogin", "true");
  localStorage.setItem("username", username);

  document.getElementById("loginPopup").style.display = "none";

  alert("Login berhasil");
  loadProfile();
}

// LOGOUT
function logout() {
  localStorage.removeItem("isLogin");
  localStorage.removeItem("username");

  alert("Logout berhasil");
  location.reload();
}

// ADD TO CART
function addToCart(product) {
  const isLogin = localStorage.getItem("isLogin");

  if (!isLogin) {
    alert("Silakan login terlebih dahulu");
    window.location.href = "profile.html";
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push(product);

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Produk berhasil ditambahkan ke cart");
}

// LOAD PROFILE
function loadProfile() {
  const isLogin = localStorage.getItem("isLogin");
  const username = localStorage.getItem("username");

  const profileInfo = document.getElementById("profileInfo");
  const cartList = document.getElementById("cartList");

  if (!profileInfo) return;

  if (isLogin) {
    profileInfo.innerHTML = `
      <h3>Halo, ${username}</h3>
      <button onclick="logout()">Logout</button>
    `;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    cartList.innerHTML = "";

    if (cart.length === 0) {
      cartList.innerHTML = "<p>Cart masih kosong</p>";
    } else {
      cart.forEach((item) => {
        cartList.innerHTML += `
          <div class="card">
            <h4>${item.name}</h4>
            <p>Harga: Rp ${item.price}</p>
          </div>
        `;
      });
    }

  } else {
    document.getElementById("loginPopup").style.display = "flex";
  }
}