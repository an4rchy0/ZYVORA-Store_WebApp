// =======================
// REGISTER
// =======================
// REGISTER
function register() {

    const fullname = document.getElementById("fullname").value;
    const username = document.getElementById("regUsername").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const password = document.getElementById("regPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (
        fullname === "" ||
        username === "" ||
        email === "" ||
        phone === "" ||
        address === "" ||
        password === ""
    ) {
        alert("Please complete all fields");
        return;
    }

    if (password !== confirmPassword) {
        alert("Password does not match");
        return;
    }

    const userData = {
        fullname,
        username,
        email,
        phone,
        address,
        password
    };

    localStorage.setItem("userData", JSON.stringify(userData));

    alert("Register successful!");

    showLogin();
}

// =======================
// LOGIN
// =======================
function login() {

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const userData = JSON.parse(localStorage.getItem("userData"));

    if (!userData) {
        alert("Account not found");
        return;
    }

    if (
        username === userData.username &&
        password === userData.password
    ) {

        localStorage.setItem("isLogin", "true");
        localStorage.setItem("username", username);

        document.getElementById("loginPopup").style.display = "none";

        alert("Login successful");

        loadProfile();

    } else {
        alert("Wrong username or password");
    }
}

// =======================
// LOGOUT
// =======================
function logout() {
  localStorage.removeItem("isLogin");
  localStorage.removeItem("username");

  alert("Logout Successfully");

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
function renderProfile() {

    const isLogin = localStorage.getItem("isLogin");
    const profileInfo = document.getElementById("profileInfo");
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (isLogin !== "true" || !userData) {
        document.getElementById("loginPopup").style.display = "flex";
        return;
    }

    // =========================
    // EDIT MODE
    // =========================
    if (isEditing) {
        profileInfo.innerHTML = `
            <div class="md:col-span-2">
                <h3 class="font-headline-md mb-4">Edit Account</h3>
            </div>

            <input id="edit_fullname" class="p-2 border rounded" value="${userData.fullname}">
            <input id="edit_username" class="p-2 border rounded" value="${userData.username}">
            <input id="edit_email" class="p-2 border rounded" value="${userData.email}">
            <input id="edit_phone" class="p-2 border rounded" value="${userData.phone}">
            <textarea id="edit_address" class="p-2 border rounded md:col-span-2">${userData.address}</textarea>
            <input id="edit_password" class="p-2 border rounded md:col-span-2" value="${userData.password}">

            <div class="md:col-span-2 flex gap-4 mt-4">
                <button onclick="saveProfile()" class="bg-green-600 text-white px-4 py-2 rounded">
                    Save
                </button>

                <button onclick="cancelEdit()" class="bg-gray-400 text-white px-4 py-2 rounded">
                    Cancel
                </button>
            </div>
        `;
        return;
    }

    // =========================
    // VIEW MODE
    // =========================
    profileInfo.innerHTML = `
        <div class="bg-white p-4 rounded-lg border">
            <p class="text-gray-500 text-xs">Full Name</p>
            <p class="font-semibold">${userData.fullname}</p>
        </div>

        <div class="bg-white p-4 rounded-lg border">
            <p class="text-gray-500 text-xs">Username</p>
            <p class="font-semibold">${userData.username}</p>
        </div>

        <div class="bg-white p-4 rounded-lg border">
            <p class="text-gray-500 text-xs">Email</p>
            <p class="font-semibold">${userData.email}</p>
        </div>

        <div class="bg-white p-4 rounded-lg border">
            <p class="text-gray-500 text-xs">Phone</p>
            <p class="font-semibold">${userData.phone}</p>
        </div>

        <div class="bg-white p-4 rounded-lg border md:col-span-2">
            <p class="text-gray-500 text-xs">Address</p>
            <p class="font-semibold">${userData.address}</p>
        </div>

        <div class="bg-white p-4 rounded-lg border md:col-span-2">
            <p class="text-gray-500 text-xs">Password</p>
            <p class="font-semibold">••••••••</p>
        </div>

        <div class="md:col-span-2 mt-4">
            <button onclick="openAccountSettings()" class="bg-blue-600 text-white px-4 py-2 rounded">
                Edit Profile
            </button>
        </div>
    `;
}

// =======================
// SWITCH FORM
// =======================
// SHOW REGISTER
function showRegister() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "block";
}

// SHOW LOGIN
function showLogin() {
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("registerForm").style.display = "none";
}

let isEditing = false;
function openAccountSettings() {
    isEditing = true;
    renderProfile();
}

function cancelEdit() {
    isEditing = false;
    renderProfile();
}

function saveProfile() {

    const userData = {
        fullname: document.getElementById("edit_fullname").value,
        username: document.getElementById("edit_username").value,
        email: document.getElementById("edit_email").value,
        phone: document.getElementById("edit_phone").value,
        address: document.getElementById("edit_address").value,
        password: document.getElementById("edit_password").value
    };

    localStorage.setItem("userData", JSON.stringify(userData));

    alert("Profile updated!");

    isEditing = false;
    renderProfile();
}

function loadProfile() {
    const isLogin = localStorage.getItem("isLogin");

    if (isLogin !== "true") {
        document.getElementById("loginPopup").style.display = "flex";
        return;
    }
    renderProfile();
    loadCart();
}

function loadCart() {

    const cartContainer = document.querySelector("#cartList + div");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (!cartContainer) return;

    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <p class="text-gray-500 col-span-4">Cart is empty</p>
        `;
        return;
    }

    cartContainer.innerHTML = cart.map((item, index) => {

        return `
          <a href="${item.link}" class="group cursor-pointer relative block">
              <div class="relative aspect-[3/4] bg-surface-container rounded-lg overflow-hidden mb-3">
                  <img class="w-full h-full object-cover" src="${item.image}" />
              </div>

              <p class="font-label-md text-center">${item.product}</p>
              <p class="text-xs text-center text-gray-500">${item.variant}</p>
              <p class="font-label-sm text-center">Rp${item.price.toLocaleString('id-ID')}</p>
              <p class="text-xs text-center">Qty: ${item.qty}</p>

              <button onclick="event.preventDefault(); removeCartItem(${index})"
                  class="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 rounded-full text-xs">
                  ×
              </button>
          </a>
          `;
    }).join('');
}

function removeCartItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    loadCart();
}

