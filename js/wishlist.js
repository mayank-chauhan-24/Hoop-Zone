// HoopZone Wishlist System

// Initialize Wishlist
let wishlist = JSON.parse(localStorage.getItem('hoopzone_wishlist')) || [];

// Save Wishlist to LocalStorage
function saveWishlist() {
  localStorage.setItem('hoopzone_wishlist', JSON.stringify(wishlist));
  updateWishlistBadges();
}

// Toggle Item in Wishlist
function toggleWishlist(productId) {
  const id = parseInt(productId);
  const product = products.find(p => p.id === id);
  if (!product) return;

  const index = wishlist.indexOf(id);

  if (index > -1) {
    // Remove from wishlist
    wishlist.splice(index, 1);
    saveWishlist();
    showToast(`${product.name} removed from wishlist.`, "success");
    return false;
  } else {
    // Add to wishlist
    wishlist.push(id);
    saveWishlist();
    showToast(`${product.name} added to wishlist!`, "success");
    return true;
  }
}

// Check if Item is in Wishlist
function isInWishlist(productId) {
  return wishlist.includes(parseInt(productId));
}

// Get Wishlist Items
function getWishlistItems() {
  return wishlist;
}

// Update badges in the header navbar (if exists)
function updateWishlistBadges() {
  const badges = document.querySelectorAll('.wishlist-badge');
  const count = wishlist.length;
  badges.forEach(badge => {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  });
}

// Initialize Wishlist buttons on dynamic grids
function initWishlistButtons() {
  const buttons = document.querySelectorAll('.wishlist-btn');
  buttons.forEach(btn => {
    const id = btn.dataset.id;
    if (isInWishlist(id)) {
      btn.classList.add('active');
      btn.querySelector('i').className = 'fa-solid fa-heart';
    } else {
      btn.classList.remove('active');
      btn.querySelector('i').className = 'fa-regular fa-heart';
    }

    // Replace click listener to avoid duplicate bindings
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);

    newBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const active = toggleWishlist(id);
      if (active) {
        newBtn.classList.add('active');
        newBtn.querySelector('i').className = 'fa-solid fa-heart';
      } else {
        newBtn.classList.remove('active');
        newBtn.querySelector('i').className = 'fa-regular fa-heart';
      }
    });
  });
}

// Auto Initialize Badges on load
document.addEventListener('DOMContentLoaded', () => {
  updateWishlistBadges();
  initWishlistButtons();
});
