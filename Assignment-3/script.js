const signupForm = document.getElementById('signupform');
if(signupForm) {
    signupForm.addEventListener('submit', async function(e){
    e.preventDefault(); // Prevent default form submission

    try {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Perform signup logic here
    const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    alert(data.message);
    if(data.message === "User registered successfully"){
        window.location.href = "login.html";
    }
    } catch(error) {
        console.error('Signup error:', error);
        alert('Error: ' + error.message);
    }
    });
}

// login
const loginForm = document.getElementById('loginform');
if(loginForm) {
    loginForm.addEventListener('submit', async function(e){
    e.preventDefault(); // Prevent default form submission

    try {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    // Perform login logic here
    const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    alert(data.message);
    if(data.message === "Login successful"){
    localStorage.setItem("user", JSON.stringify({ email }));
    window.location.href = "index.html";
    }
    } catch(error) {
        console.error('Login error:', error);
        alert('Error: ' + error.message);
    }
    });
}


// MAIN
const mainTitle = document.getElementById("mainTitle");
const mainEmail = document.getElementById("mainEmail");
const profileBtn = document.getElementById("profileBtn");
const logoutBtn = document.getElementById("logoutBtn");
if (mainTitle || mainEmail || profileBtn || logoutBtn) {
  const userRaw = localStorage.getItem("user");
  if (!userRaw) { window.location.href = "login.html"; }
  else {
    const user = JSON.parse(userRaw);
    mainTitle && (mainTitle.textContent = "Welcome, " + user.email);
    mainEmail && (mainEmail.textContent = user.email);
  }
  profileBtn && profileBtn.addEventListener("click", () => window.location.href = "profile.html");
  logoutBtn && logoutBtn.addEventListener("click", () => { localStorage.removeItem("user"); window.location.href = "login.html";});
}

// PROFILE
const profileEmail = document.getElementById("profileEmail");
const profileBack = document.getElementById("profileBack");
const profileLogout = document.getElementById("profileLogout");
if (profileEmail) {
  const stored = localStorage.getItem("user");
  if (!stored) { window.location.href = "login.html"; }
  else {
    const user = JSON.parse(stored);
    profileEmail.textContent = user.email;
  }
  profileBack && profileBack.addEventListener("click", () => window.location.href = "index.html");
  profileLogout && profileLogout.addEventListener("click", () => { localStorage.removeItem("user"); window.location.href = "login.html"; });
}

// CART Logic
function getCart() {
  return JSON.parse(localStorage.getItem('cart') || '[]');
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCartCount();
}

function renderCartCount() {
  const countEl = document.getElementById('cartCount');
  if (!countEl) return;
  const cart = getCart();
  const total = cart.reduce((sum, item) => sum + item.qty, 0);
  countEl.textContent = total;
}

function addToCart(item) {
  const cart = getCart();
  const existing = cart.find(i => i.id === item.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }
  saveCart(cart);
  alert(`${item.title} added to cart`);
}

function setupAddToCartHandlers() {
  const buttons = document.querySelectorAll('.cards .card button');
  if (!buttons.length) return;
  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      const card = button.closest('.card');
      const title = card.querySelector('h3')?.innerText?.trim();
      const priceText = card.querySelector('p')?.innerText?.trim();
      const price = Number(priceText.replace(/[^0-9.]/g, '')) || 0;
      const id = `${title}-${price}-${index}`;
      addToCart({ id, title, price });
    });
  });
}

function renderCartPage() {
  const cart = getCart();
  const cartArea = document.getElementById('cartArea');
  if (!cartArea) return;

  if (!cart.length) {
    cartArea.innerHTML = '<p>Your cart is empty.</p>';
    document.getElementById('checkoutBtn')?.setAttribute('disabled', 'true');
    return;
  }

  let total = 0;
  const rows = cart.map(item => {
    const subtotal = item.qty * item.price;
    total += subtotal;
    return `
      <tr>
        <td>${item.title}</td>
        <td>${item.price}</td>
        <td>${item.qty}</td>
        <td>${subtotal}</td>
      </tr>
    `;
  }).join('');

  cartArea.innerHTML = `
    <table class="cart-table">
      <thead><tr><th>Item</th><th>Price</th><th>Qty</th><th>Subtotal</th></tr></thead>
      <tbody>${rows}</tbody>
      <tfoot><tr><td colspan="3"><strong>Total</strong></td><td><strong>${total}</strong></td></tr></tfoot>
    </table>
  `;

  document.getElementById('checkoutBtn')?.removeAttribute('disabled');

  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.onclick = () => {
      if (!cart.length) {
        alert('Cart is empty');
        return;
      }
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      orders.push({
        id: `ORD-${Date.now()}`,
        createdAt: new Date().toLocaleString(),
        items: cart,
        total,
      });
      localStorage.setItem('orders', JSON.stringify(orders));
      localStorage.removeItem('cart');
      renderCartCount();
      alert('Order placed successfully!');
      window.location.href = 'orders.html';
    };
  }
}

function renderOrdersPage() {
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  const ordersArea = document.getElementById('ordersArea');
  if (!ordersArea) return;

  if (!orders.length) {
    ordersArea.innerHTML = '<p>No orders yet. Add items to cart and checkout.</p>';
    return;
  }

  ordersArea.innerHTML = orders.map(order => {
    const itemsHTML = order.items.map(i => `<li>${i.title} x${i.qty} = ₹${i.price * i.qty}</li>`).join('');
    return `
      <div class="order-card">
        <h3>Order ${order.id}</h3>
        <p><strong>Date:</strong> ${order.createdAt}</p>
        <ul>${itemsHTML}</ul>
        <p><strong>Total:</strong> ₹${order.total}</p>
      </div>
    `;
  }).join('');
}

window.addEventListener('DOMContentLoaded', () => {
  renderCartCount();
  setupAddToCartHandlers();
  renderCartPage();
  renderOrdersPage();

  document.getElementById('continueShopping')?.addEventListener('click', () => {
    window.location.href = 'index.html';
  });
});