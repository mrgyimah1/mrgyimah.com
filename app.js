// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
themeToggle?.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  themeToggle.innerHTML = document.body.classList.contains('dark-mode') 
    ? '<i class="fas fa-sun"></i>' 
    : '<i class="fas fa-moon"></i>';
});

// Cart System
let cart = {
  items: [],
  total: 0,
  count: 0
};

// Initialize Cart
function initializeCart() {
  const storedCart = sessionStorage.getItem('cart');
  if (storedCart) {
    cart = JSON.parse(storedCart);
    updateCartDisplay();
    renderCartItems();
  }
}

// Add to Cart Functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', (e) => {
    const price = parseFloat(e.target.dataset.price);
    const title = e.target.dataset.title;
    const id = Date.now().toString();
    
    cart.items.push({ id, title, price });
    cart.total += price;
    cart.count++;
    
    updateCart();
    sessionStorage.setItem('cart', JSON.stringify(cart));
  });
});

// Remove Item from Cart
document.addEventListener('click', (e) => {
  if (e.target.closest('.cart-item-remove')) {
    const itemId = e.target.closest('.cart-item-remove').dataset.id;
    cart.items = cart.items.filter(item => item.id !== itemId);
    cart.total = cart.items.reduce((sum, item) => sum + item.price, 0);
    cart.count = cart.items.length;
    updateCart();
  }
});

// Update Cart Display
function updateCart() {
  document.getElementById('cartCount').textContent = cart.count;
  document.getElementById('cartCountSidebar').textContent = cart.count;
  sessionStorage.setItem('cart', JSON.stringify(cart));
  renderCartItems();
}

// Render Cart Items
function renderCartItems() {
  const cartItems = document.getElementById('cartItems');
  const cartTotalAmount = document.getElementById('cartTotalAmount');
  
  cartItems.innerHTML = '';
  cart.items.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <div class="cart-item-details">
        <h4>${item.title}</h4>
        <p>GHS ${item.price.toFixed(2)}</p>
      </div>
      <span class="cart-item-remove" data-id="${item.id}">
        <i class="fas fa-trash"></i>
      </span>
    `;
    cartItems.appendChild(cartItem);
  });
  
  cartTotalAmount.textContent = cart.total.toFixed(2);
}

// Cart Sidebar Toggle
document.getElementById('viewCartBtn')?.addEventListener('click', () => {
  document.getElementById('cartSidebar').classList.add('active');
});

document.addEventListener('click', (e) => {
  const cartSidebar = document.getElementById('cartSidebar');
  if (!cartSidebar.contains(e.target) && !e.target.closest('#viewCartBtn')) {
    cartSidebar.classList.remove('active');
  }
});

// Checkout Redirect
document.getElementById('checkoutSidebarBtn')?.addEventListener('click', () => {
  if (cart.count === 0) return alert('Your cart is empty!');
  window.location.href = 'checkout.html';
});

// Account Modal
const accountBtn = document.getElementById('accountBtn');
const accountForm = document.getElementById('accountForm');
const accountOverlay = document.getElementById('accountOverlay');
const closeAccountForm = document.getElementById('closeAccountForm');

accountBtn?.addEventListener('click', () => {
  accountOverlay.style.display = 'block';
  accountForm.style.display = 'block';
});

closeAccountForm?.addEventListener('click', () => {
  accountForm.style.display = 'none';
  accountOverlay.style.display = 'none';
});

accountOverlay?.addEventListener('click', () => {
  accountForm.style.display = 'none';
  accountOverlay.style.display = 'none';
});

// Search Functionality
document.getElementById('searchInput')?.addEventListener('input', filterBooks);
document.getElementById('searchButton')?.addEventListener('click', filterBooks);

function filterBooks() {
  const searchQuery = document.getElementById('searchInput').value.toLowerCase();
  const cards = document.querySelectorAll('.textbook-card');
  cards.forEach(card => {
    const title = card.querySelector('.textbook-info h3').textContent.toLowerCase();
    card.style.display = title.includes(searchQuery) ? 'block' : 'none';
  });
}

// Initialize on Load
document.addEventListener('DOMContentLoaded', initializeCart);