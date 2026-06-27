// HoopZone Shopping Cart System

// Initialize Cart
let cart = JSON.parse(localStorage.getItem('hoopzone_cart')) || [];
let activeCoupon = JSON.parse(localStorage.getItem('hoopzone_coupon')) || null;

// Save Cart to LocalStorage
function saveCart() {
  localStorage.setItem('hoopzone_cart', JSON.stringify(cart));
  updateCartBadges();
}

// Save Coupon to LocalStorage
function saveCoupon() {
  localStorage.setItem('hoopzone_coupon', JSON.stringify(activeCoupon));
}

// Add Item to Cart
function addToCart(productId, quantity = 1, showToastNotify = true) {
  const product = products.find(p => p.id === parseInt(productId));
  if (!product) return;

  if (!product.inStock) {
    showToast("This item is currently out of stock.", "error");
    return;
  }

  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += parseInt(quantity);
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      quantity: parseInt(quantity)
    });
  }

  saveCart();

  if (showToastNotify) {
    showToast(`${product.name} added to cart!`, "success");
  }
}

// Remove Item from Cart
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== parseInt(productId));
  saveCart();
  showToast("Item removed from cart.", "success");
}

// Update Item Quantity
function updateQuantity(productId, quantity) {
  const item = cart.find(item => item.id === parseInt(productId));
  if (!item) return;

  item.quantity = parseInt(quantity);
  
  if (item.quantity <= 0) {
    removeFromCart(productId);
  } else {
    saveCart();
  }
}

// Get Cart Items
function getCartItems() {
  return cart;
}

// Clear Cart
function clearCart() {
  cart = [];
  activeCoupon = null;
  saveCart();
  saveCoupon();
}

// Cart Computations
function getSubtotal() {
  return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function getDiscountAmount() {
  if (!activeCoupon) return 0;
  if (activeCoupon.code === 'HOOP20') {
    return getSubtotal() * 0.20; // 20% discount
  }
  return 0;
}

function getShippingCost() {
  const subtotal = getSubtotal();
  if (subtotal === 0) return 0;
  return subtotal > 5000 ? 0 : 99; // Free shipping over ₹5000
}

function getOrderTotal() {
  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const shipping = getShippingCost();
  return (subtotal - discount) + shipping;
}

function getCartCount() {
  return cart.reduce((count, item) => count + item.quantity, 0);
}

// Update badges in the header navbar
function updateCartBadges() {
  const badges = document.querySelectorAll('.cart-badge');
  const count = getCartCount();
  badges.forEach(badge => {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  });
}

// Toast Notifications Function
function showToast(message, type = "success") {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type === 'success' ? 'toast-success' : ''}`;
  
  const icon = type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation';
  
  toast.innerHTML = `
    <div class="toast-content">
      <i class="fa-solid ${icon} toast-icon"></i>
      <span>${message}</span>
    </div>
    <i class="fa-solid fa-xmark toast-close"></i>
  `;

  container.appendChild(toast);

  // Trigger Slide in
  setTimeout(() => toast.classList.add('show'), 10);

  // Close button binding
  toast.querySelector('.toast-close').addEventListener('click', () => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  });

  // Autohide after 3.5s
  setTimeout(() => {
    if (toast.parentNode) {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }
  }, 3500);
}

// Apply Coupon Code
function applyCoupon(code) {
  const normalized = code.trim().toUpperCase();
  if (normalized === 'HOOP20') {
    activeCoupon = { code: 'HOOP20', discountPercent: 20 };
    saveCoupon();
    showToast("Coupon Applied! 20% discount active.", "success");
    return true;
  } else {
    showToast("Invalid coupon code.", "error");
    return false;
  }
}

// Remove Coupon
function removeCoupon() {
  activeCoupon = null;
  saveCoupon();
  showToast("Coupon removed.", "success");
}

// Render dynamic elements for Cart Page
function renderCartPageUI() {
  const tableBody = document.querySelector('.cart-items-body');
  const emptyState = document.querySelector('.cart-empty-state');
  const cartContent = document.querySelector('.cart-filled-content');

  if (!tableBody) return; // Ensure we are on cart.html page

  const items = getCartItems();

  if (items.length === 0) {
    emptyState.style.display = 'block';
    cartContent.style.display = 'none';
    return;
  }

  emptyState.style.display = 'none';
  cartContent.style.display = 'grid';

  tableBody.innerHTML = '';
  items.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <div class="cart-product-cell">
          <div class="cart-product-img">
            <img src="${item.image}" alt="${item.name}">
          </div>
          <div class="cart-product-info">
            <h5><a href="product.html?id=${item.id}">${item.name}</a></h5>
            <span>${item.category}</span>
          </div>
        </div>
      </td>
      <td>₹${item.price.toFixed(0)}</td>
      <td>
        <div class="quantity-selector">
          <button class="qty-btn minus" data-id="${item.id}">-</button>
          <input type="number" class="qty-input" value="${item.quantity}" min="1" readonly data-id="${item.id}">
          <button class="qty-btn plus" data-id="${item.id}">+</button>
        </div>
      </td>
      <td>₹${(item.price * item.quantity).toFixed(0)}</td>
      <td>
        <button class="cart-remove-btn" data-id="${item.id}">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </td>
    `;
    tableBody.appendChild(row);
  });

  // Bind click event listeners for buttons in rows
  document.querySelectorAll('.qty-btn.minus').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.target.dataset.id;
      const item = cart.find(i => i.id === parseInt(id));
      if (item) {
        updateQuantity(id, item.quantity - 1);
        renderCartPageUI();
      }
    });
  });

  document.querySelectorAll('.qty-btn.plus').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.target.dataset.id;
      const item = cart.find(i => i.id === parseInt(id));
      if (item) {
        updateQuantity(id, item.quantity + 1);
        renderCartPageUI();
      }
    });
  });

  document.querySelectorAll('.cart-remove-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetBtn = e.target.closest('.cart-remove-btn');
      const id = targetBtn.dataset.id;
      removeFromCart(id);
      renderCartPageUI();
    });
  });

  updateCartSummaryUI();
}

// Update Cart Summary card values
function updateCartSummaryUI() {
  const subtotalEl = document.querySelector('.summary-subtotal');
  const discountRow = document.querySelector('.summary-discount-row');
  const discountEl = document.querySelector('.summary-discount');
  const shippingEl = document.querySelector('.summary-shipping');
  const totalEl = document.querySelector('.summary-total');
  const couponInput = document.querySelector('.coupon-code-input');
  const discountMsg = document.querySelector('.discount-message');

  if (!subtotalEl) return;

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const shipping = getShippingCost();
  const total = getOrderTotal();

  subtotalEl.textContent = `₹${subtotal.toFixed(0)}`;
  
  if (discount > 0) {
    discountRow.style.display = 'flex';
    discountEl.textContent = `-₹${discount.toFixed(0)}`;
    if (discountMsg) {
      discountMsg.style.display = 'block';
      discountMsg.textContent = `Promo Code Applied (20% OFF)`;
    }
  } else {
    discountRow.style.display = 'none';
    if (discountMsg) discountMsg.style.display = 'none';
  }

  shippingEl.textContent = shipping === 0 ? 'FREE' : `₹${shipping.toFixed(0)}`;
  totalEl.textContent = `₹${total.toFixed(0)}`;
}

// Render dynamic elements for Checkout Page Summary
function renderCheckoutSummaryUI() {
  const summaryList = document.querySelector('.checkout-summary-list');
  const subtotalEl = document.querySelector('.checkout-subtotal');
  const discountRow = document.querySelector('.checkout-discount-row');
  const discountEl = document.querySelector('.checkout-discount');
  const shippingEl = document.querySelector('.checkout-shipping');
  const totalEl = document.querySelector('.checkout-total');

  if (!summaryList) return; // Ensure we are on checkout.html

  const items = getCartItems();
  
  summaryList.innerHTML = '';
  items.forEach(item => {
    const el = document.createElement('div');
    el.className = 'checkout-summary-item';
    el.innerHTML = `
      <div>
        <strong>${item.name}</strong> <span class="text-primary-color">x${item.quantity}</span>
        <br><small style="color: var(--text-secondary)">${item.category}</small>
      </div>
      <div>₹${(item.price * item.quantity).toFixed(0)}</div>
    `;
    summaryList.appendChild(el);
  });

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const shipping = getShippingCost();
  const total = getOrderTotal();

  subtotalEl.textContent = `₹${subtotal.toFixed(0)}`;
  
  if (discount > 0) {
    discountRow.style.display = 'flex';
    discountEl.textContent = `-₹${discount.toFixed(0)}`;
  } else {
    discountRow.style.display = 'none';
  }

  shippingEl.textContent = shipping === 0 ? 'FREE' : `₹${shipping.toFixed(0)}`;
  totalEl.textContent = `₹${total.toFixed(0)}`;
}

// Auto Initialize Badges on load
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadges();
  
  // Set up coupon form triggers if exists on cart page
  const applyCouponBtn = document.querySelector('.apply-coupon-btn');
  const couponInput = document.querySelector('.coupon-code-input');

  if (applyCouponBtn && couponInput) {
    // If active coupon already exists, fill it in
    if (activeCoupon) {
      couponInput.value = activeCoupon.code;
    }
    
    applyCouponBtn.addEventListener('click', () => {
      const code = couponInput.value;
      if (code) {
        const success = applyCoupon(code);
        if (success) {
          renderCartPageUI();
        }
      } else {
        removeCoupon();
        renderCartPageUI();
      }
    });
  }
});
