// HoopZone Shop Page Search & Filtering Engine

let activeFilters = {
  categories: [],
  minPrice: 0,
  maxPrice: 50000,
  searchQuery: "",
  inStockOnly: false,
  sortBy: "best-selling"
};

// Main render function for products grid
function renderProducts(filteredList) {
  const grid = document.getElementById('products-grid');
  const countEl = document.getElementById('products-count');

  if (!grid) return; // Ensure we are on shop.html

  // Clear grid
  grid.innerHTML = '';

  // Update showing count
  if (countEl) {
    countEl.textContent = `Showing ${filteredList.length} of ${products.length} products`;
  }

  // Handle empty state
  if (filteredList.length === 0) {
    grid.style.gridTemplateColumns = '1fr';
    grid.innerHTML = `
      <div style="text-align: center; padding: 60px 20px; color: var(--text-secondary);">
        <i class="fa-solid fa-basketball" style="font-size: 3.5rem; color: var(--border-color); margin-bottom: 20px; animation: spin-slow 8s linear infinite;"></i>
        <h3 style="color: var(--text-primary); margin-bottom: 10px; text-transform: uppercase;">No Products Found</h3>
        <p style="margin-bottom: 24px;">We couldn't find any items matching your exact filter settings.</p>
        <button class="btn btn-primary btn-sm reset-all-filters-btn">Clear All Filters</button>
      </div>
    `;

    // Bind reset btn
    grid.querySelector('.reset-all-filters-btn').addEventListener('click', resetAllFilters);
    return;
  }

  // Restore columns
  grid.style.gridTemplateColumns = '';

  // Loop & render cards
  filteredList.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';

    const badgesHtml = [];
    if (product.isBestSeller) {
      badgesHtml.push(`<span class="product-badge">Best Seller</span>`);
    } else if (product.isTopPick) {
      badgesHtml.push(`<span class="product-badge" style="background-color: var(--text-primary); color: var(--bg-primary);">Top Pick</span>`);
    }

    if (!product.inStock) {
      badgesHtml.push(`<span class="product-badge out-of-stock">Out of Stock</span>`);
    }

    card.innerHTML = `
      <div class="product-badge-container">
        ${badgesHtml.join('')}
      </div>
      <button class="wishlist-btn" data-id="${product.id}">
        <i class="fa-regular fa-heart"></i>
      </button>
      <div class="product-img-wrapper">
        <a href="product.html?id=${product.id}">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
        </a>
      </div>
      <div class="product-info">
        <span class="product-cat">${product.category}</span>
        <a href="product.html?id=${product.id}" class="product-title-link">${product.name}</a>
        <div class="product-rating">
          <div class="stars">
            ${generateStarsHtml(product.rating)}
          </div>
          <span class="reviews-count">(${product.reviewsCount})</span>
        </div>
        <div class="product-footer">
          <span class="product-price">₹${product.price.toFixed(0)}</span>
          <button class="add-to-cart-btn" data-id="${product.id}">
            <i class="fa-solid fa-bag-shopping"></i>
          </button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  // Bind add-to-cart buttons
  grid.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.target.closest('.add-to-cart-btn').dataset.id;
      addToCart(id, 1, true);
    });
  });

  // Bind wishlist buttons
  if (typeof initWishlistButtons === 'function') {
    initWishlistButtons();
  }
}

// Generate stars visual helper
function generateStarsHtml(rating) {
  let stars = '';
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  for (let i = 0; i < fullStars; i++) {
    stars += '<i class="fa-solid fa-star"></i>';
  }
  if (halfStar) {
    stars += '<i class="fa-solid fa-star-half-stroke"></i>';
  }
  for (let i = 0; i < emptyStars; i++) {
    stars += '<i class="fa-regular fa-star"></i>';
  }
  return stars;
}

// Apply searches & filtration constraints
function applyFilters() {
  let list = [...products];

  // Wishlist URL filter support
  const urlParams = new URLSearchParams(window.location.search);
  const showWishlistOnly = urlParams.get('wishlist') === 'true';
  if (showWishlistOnly) {
    list = list.filter(p => wishlist.includes(p.id));
    // Update page heading
    const headerTitle = document.querySelector('.bold-heading');
    if (headerTitle) {
      headerTitle.textContent = "My Wishlist";
    }
  }

  // Search filter
  if (activeFilters.searchQuery) {
    const q = activeFilters.searchQuery.toLowerCase();
    list = list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }

  // Category filter
  if (activeFilters.categories.length > 0) {
    list = list.filter(p => activeFilters.categories.includes(p.category));
  }

  // Price range filters
  list = list.filter(p => p.price >= activeFilters.minPrice && p.price <= activeFilters.maxPrice);

  // Availability filters
  if (activeFilters.inStockOnly) {
    list = list.filter(p => p.inStock);
  }

  // Sorting
  if (activeFilters.sortBy === 'price-low-to-high') {
    list.sort((a, b) => a.price - b.price);
  } else if (activeFilters.sortBy === 'price-high-to-low') {
    list.sort((a, b) => b.price - a.price);
  } else if (activeFilters.sortBy === 'newest') {
    // Treat higher ID as newer items
    list.sort((a, b) => b.id - a.id);
  } else if (activeFilters.sortBy === 'best-selling') {
    // Sort by best sellers first, then rating
    list.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0) || b.rating - a.rating);
  }

  renderProducts(list);
}

// Reset UI and internal filter states
function resetAllFilters() {
  activeFilters.categories = [];
  activeFilters.minPrice = 0;
  activeFilters.maxPrice = 50000;
  activeFilters.searchQuery = "";
  activeFilters.inStockOnly = false;
  activeFilters.sortBy = "best-selling";

  // Reset Form inputs
  const searchInput = document.getElementById('search-input');
  if (searchInput) searchInput.value = '';

  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) sortSelect.value = 'best-selling';

  const stockFilter = document.getElementById('stock-filter');
  if (stockFilter) stockFilter.checked = false;

  const minPriceInput = document.getElementById('min-price');
  const maxPriceInput = document.getElementById('max-price');
  if (minPriceInput) minPriceInput.value = '';
  if (maxPriceInput) maxPriceInput.value = '';

  document.querySelectorAll('.category-filter').forEach(checkbox => {
    checkbox.checked = false;
  });

  applyFilters();
}

// Initialize Filters setup
function initShopFilters() {
  const searchInput = document.getElementById('search-input');
  const sortSelect = document.getElementById('sort-select');
  const stockFilter = document.getElementById('stock-filter');
  const minPriceInput = document.getElementById('min-price');
  const maxPriceInput = document.getElementById('max-price');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      activeFilters.searchQuery = e.target.value;
      applyFilters();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      activeFilters.sortBy = e.target.value;
      applyFilters();
    });
  }

  if (stockFilter) {
    stockFilter.addEventListener('change', (e) => {
      activeFilters.inStockOnly = e.target.checked;
      applyFilters();
    });
  }

  if (minPriceInput) {
    minPriceInput.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      activeFilters.minPrice = isNaN(val) ? 0 : val;
      applyFilters();
    });
  }

  if (maxPriceInput) {
    maxPriceInput.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      activeFilters.maxPrice = isNaN(val) ? 50000 : val;
      applyFilters();
    });
  }

  // Categories checkboxes binding
  document.querySelectorAll('.category-filter').forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
      const categoryName = e.target.value;
      if (e.target.checked) {
        activeFilters.categories.push(categoryName);
      } else {
        activeFilters.categories = activeFilters.categories.filter(c => c !== categoryName);
      }
      applyFilters();
    });
  });

  // Pre-load layout with category if URL parameter is present
  const urlParams = new URLSearchParams(window.location.search);
  const urlCat = urlParams.get('category');
  if (urlCat) {
    const box = document.querySelector(`.category-filter[value="${urlCat}"]`);
    if (box) {
      box.checked = true;
      activeFilters.categories.push(urlCat);
    }
  }

  // Trigger Skeletons simulation first
  simulateSkeletonLoad();
}

// Visual load skeletons
function simulateSkeletonLoad() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  grid.innerHTML = '';
  for (let i = 0; i < 8; i++) {
    const skeleton = document.createElement('div');
    skeleton.className = 'skeleton-card';
    skeleton.innerHTML = `
      <div class="skeleton-image"></div>
      <div class="skeleton-text title"></div>
      <div class="skeleton-text"></div>
      <div class="skeleton-text price"></div>
    `;
    grid.appendChild(skeleton);
  }

  setTimeout(() => {
    applyFilters();
  }, 750);
}

// Bind load event
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('products-grid')) {
    initShopFilters();
  }
});
