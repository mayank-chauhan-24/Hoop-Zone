// HoopZone Global Site Scripts

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileMenu();
  initStickyHeader();
  initCountdownTimer();
  initAchievementCounters();
  initTestimonialsCarousel();
  initScrollReveal();
  initContactForm();

  // Wait for products to load before initializing product detail logic
  if (products && products.length > 0) {
    initProductDetailPage();
  } else {
    document.addEventListener('productsLoaded', initProductDetailPage);
  }
});

/* Theme Toggle (Dark/Light Modes) */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  if (!toggleBtn) return;

  const currentTheme = localStorage.getItem('hoopzone_theme') || 'dark';

  if (currentTheme === 'light') {
    document.body.classList.add('light-theme');
    toggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
  } else {
    document.body.classList.remove('light-theme');
    toggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
  }

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    localStorage.setItem('hoopzone_theme', isLight ? 'light' : 'dark');
    toggleBtn.innerHTML = isLight ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
    showToast(`${isLight ? 'Light' : 'Dark'} mode activated.`, "success");
  });
}

/* Mobile Hamburger Navigation Menu */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (!hamburger || !navMenu) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close menu when clicking a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}

/* Sticky Header Scroll Behaviors */
function initStickyHeader() {
  const header = document.querySelector('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.padding = '4px 0';
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.padding = '0';
      header.style.boxShadow = 'none';
    }
  });
}

/* Sale Countdown Timer Clock */
function initCountdownTimer() {
  const daysEl = document.getElementById('timer-days');
  const hoursEl = document.getElementById('timer-hours');
  const minsEl = document.getElementById('timer-mins');
  const secsEl = document.getElementById('timer-secs');

  if (!daysEl) return;

  // Set target date (e.g. 7 days from now)
  let targetDate = localStorage.getItem('hoopzone_timer_target');
  if (!targetDate) {
    targetDate = new Date().getTime() + (7 * 24 * 60 * 60 * 1000); // 7 days in ms
    localStorage.setItem('hoopzone_timer_target', targetDate);
  } else {
    targetDate = parseInt(targetDate);
    // If timer expired, reset for another 7 days
    if (targetDate - new Date().getTime() < 0) {
      targetDate = new Date().getTime() + (7 * 24 * 60 * 60 * 1000);
      localStorage.setItem('hoopzone_timer_target', targetDate);
    }
  }

  function updateTimer() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      clearInterval(timerInterval);
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.textContent = d < 10 ? '0' + d : d;
    hoursEl.textContent = h < 10 ? '0' + h : h;
    minsEl.textContent = m < 10 ? '0' + m : m;
    secsEl.textContent = s < 10 ? '0' + s : s;
  }

  const timerInterval = setInterval(updateTimer, 1000);
  updateTimer(); // Initial call
}

/* Achievement Counters Increment Animations */
function initAchievementCounters() {
  const counters = document.querySelectorAll('.stat-number');
  if (counters.length === 0) return;

  const observerOptions = {
    root: null,
    threshold: 0.5
  };

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds animation
        const stepTime = 30;
        const totalSteps = duration / stepTime;
        const increment = target / totalSteps;
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            counter.textContent = formatStatNumber(target);
            clearInterval(timer);
          } else {
            counter.textContent = formatStatNumber(Math.floor(current));
          }
        }, stepTime);

        counterObserver.unobserve(counter);
      }
    });
  }, observerOptions);

  counters.forEach(counter => counterObserver.observe(counter));
}

function formatStatNumber(num) {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k+';
  }
  return num + '+';
}

/* Testimonials Carousel Controls */
function initTestimonialsCarousel() {
  const track = document.querySelector('.testimonial-track');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');

  if (!track) return;

  const slides = Array.from(track.children);
  let currentIndex = 0;
  let autoplayTimer;

  function moveToSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    
    track.style.transform = `translateX(-${index * 100}%)`;
    currentIndex = index;
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      moveToSlide(currentIndex - 1);
      resetAutoplay();
    });

    nextBtn.addEventListener('click', () => {
      moveToSlide(currentIndex + 1);
      resetAutoplay();
    });
  }

  function startAutoplay() {
    autoplayTimer = setInterval(() => {
      moveToSlide(currentIndex + 1);
    }, 5000); // Change review slide every 5 seconds
  }

  function resetAutoplay() {
    clearInterval(autoplayTimer);
    startAutoplay();
  }

  startAutoplay();
}

/* Scroll Reveal Animation system */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.scroll-reveal');
  if (reveals.length === 0) return;

  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  reveals.forEach(reveal => revealObserver.observe(reveal));
}

/* Product Detail Page Dynamic Loader & Features */
function initProductDetailPage() {
  const detailContainer = document.querySelector('.product-detail-layout');
  if (!detailContainer) return; // Ensure we are on product.html

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id') || 1; // Default to ID 1
  const product = products.find(p => p.id === parseInt(productId));

  if (!product) {
    detailContainer.innerHTML = `
      <div style="grid-column: span 2; text-align: center; padding: 80px 20px;">
        <h2 style="text-transform: uppercase; margin-bottom: 12px;">Product Not Found</h2>
        <p style="color: var(--text-secondary); margin-bottom: 24px;">The basketball gear you requested does not exist or has been removed.</p>
        <a href="shop.html" class="btn btn-primary">Back to Shop</a>
      </div>
    `;
    return;
  }

  // Set Tab Title
  document.title = `${product.name} | HoopZone`;

  // Render detail contents
  const mainImageEl = document.querySelector('.main-image-wrapper img');
  const galleryThumbnails = document.querySelector('.thumbnail-row');
  const titleEl = document.querySelector('.detail-title');
  const catEl = document.querySelector('.detail-cat');
  const priceEl = document.querySelector('.detail-price');
  const descEl = document.querySelector('.detail-desc');
  const featuresList = document.querySelector('.detail-features-list');
  const ratingStars = document.querySelector('.detail-stars');
  const reviewCountEl = document.querySelector('.detail-reviews-count');
  
  // Set values
  if (mainImageEl) mainImageEl.src = product.image;
  if (titleEl) titleEl.textContent = product.name;
  if (catEl) catEl.textContent = product.category;
  if (priceEl) priceEl.textContent = `₹${product.price.toFixed(0)}`;
  if (descEl) descEl.textContent = product.description;

  // Features list
  if (featuresList) {
    featuresList.innerHTML = '';
    product.features.forEach(feat => {
      const li = document.createElement('li');
      li.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${feat}`;
      featuresList.appendChild(li);
    });
  }

  // Ratings
  if (ratingStars) {
    ratingStars.innerHTML = generateStarsHtml(product.rating);
  }
  if (reviewCountEl) {
    reviewCountEl.textContent = `(${product.reviewsCount} customer reviews)`;
  }

  // Render thumbnails
  if (galleryThumbnails && product.images) {
    galleryThumbnails.innerHTML = '';
    product.images.forEach((imgSrc, index) => {
      const thumb = document.createElement('div');
      thumb.className = `thumbnail-box ${index === 0 ? 'active' : ''}`;
      thumb.innerHTML = `<img src="${imgSrc}" alt="${product.name} alternate photo ${index + 1}">`;
      
      thumb.addEventListener('click', () => {
        document.querySelectorAll('.thumbnail-box').forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        mainImageEl.src = imgSrc;
      });
      galleryThumbnails.appendChild(thumb);
    });
  }

  // Zoom feature on hover for main photo
  if (mainImageEl) {
    const wrapper = document.querySelector('.main-image-wrapper');
    wrapper.addEventListener('mousemove', (e) => {
      const rect = e.target.getBoundingClientRect();
      const x = e.clientX - rect.left; // x coordinate inside the image
      const y = e.clientY - rect.top;  // y coordinate inside the image
      
      const xPercent = (x / rect.width) * 100;
      const yPercent = (y / rect.height) * 100;

      mainImageEl.style.transformOrigin = `${xPercent}% ${yPercent}%`;
      mainImageEl.style.transform = 'scale(1.8)';
    });

    wrapper.addEventListener('mouseleave', () => {
      mainImageEl.style.transform = 'scale(1)';
      mainImageEl.style.transformOrigin = 'center center';
    });
  }

  // Tab systems logic
  const tabHeaders = document.querySelectorAll('.tab-header');
  const tabContents = document.querySelectorAll('.tab-content');

  tabHeaders.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      
      tabHeaders.forEach(th => th.classList.remove('active'));
      tabContents.forEach(tc => tc.classList.remove('active'));

      tab.classList.add('active');
      const targetContent = document.getElementById(`tab-${target}`);
      if (targetContent) targetContent.classList.add('active');
    });
  });

  // Render Reviews tab content
  const reviewList = document.querySelector('.review-list');
  if (reviewList && product.reviews) {
    reviewList.innerHTML = '';
    product.reviews.forEach(rev => {
      const el = document.createElement('div');
      el.className = 'review-item';
      el.innerHTML = `
        <div class="review-meta">
          <span class="review-user">${rev.user}</span>
          <div class="stars" style="color: var(--star-color); font-size: 0.85rem">
            ${generateStarsHtml(rev.rating)}
          </div>
        </div>
        <p class="review-comment">${rev.comment}</p>
        <small style="color: var(--text-secondary); display: block; margin-top: 8px;">Published on ${rev.date}</small>
      `;
      reviewList.appendChild(el);
    });
  }

  // Quantity adjustments
  const qtyMinus = document.querySelector('.qty-btn.minus');
  const qtyPlus = document.querySelector('.qty-btn.plus');
  const qtyInput = document.querySelector('.qty-input');

  if (qtyMinus && qtyPlus && qtyInput) {
    qtyMinus.addEventListener('click', () => {
      const val = parseInt(qtyInput.value);
      if (val > 1) qtyInput.value = val - 1;
    });

    qtyPlus.addEventListener('click', () => {
      const val = parseInt(qtyInput.value);
      qtyInput.value = val + 1;
    });
  }

  // Add to cart detail page binding
  const addToCartBtn = document.querySelector('.add-to-cart-detail-btn');
  if (addToCartBtn) {
    if (!product.inStock) {
      addToCartBtn.textContent = 'Out of Stock';
      addToCartBtn.disabled = true;
      addToCartBtn.style.opacity = '0.5';
      addToCartBtn.style.cursor = 'not-allowed';
    } else {
      addToCartBtn.addEventListener('click', () => {
        const qty = qtyInput ? parseInt(qtyInput.value) : 1;
        addToCart(product.id, qty, true);
      });
    }
  }

  // Wishlist details binding
  const wishBtn = document.querySelector('.wishlist-detail-btn');
  if (wishBtn) {
    // Set initial class
    if (isInWishlist(product.id)) {
      wishBtn.classList.add('btn-primary');
      wishBtn.innerHTML = '<i class="fa-solid fa-heart"></i> In Wishlist';
    } else {
      wishBtn.classList.add('btn-dark');
      wishBtn.innerHTML = '<i class="fa-regular fa-heart"></i> Add to Wishlist';
    }

    wishBtn.addEventListener('click', () => {
      const isAdded = toggleWishlist(product.id);
      if (isAdded) {
        wishBtn.className = 'btn btn-primary wishlist-detail-btn';
        wishBtn.innerHTML = '<i class="fa-solid fa-heart"></i> In Wishlist';
      } else {
        wishBtn.className = 'btn btn-dark wishlist-detail-btn';
        wishBtn.innerHTML = '<i class="fa-regular fa-heart"></i> Add to Wishlist';
      }
    });
  }

  // Dynamic recommendations
  renderRecommendations(product.category, product.id);

  // Set recently viewed product history
  updateRecentlyViewed(product.id);
}

// Generate stars visual helper (only define if not already declared by search.js)
if (typeof generateStarsHtml === 'undefined') {
  window.generateStarsHtml = function(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    for (let i = 0; i < fullStars; i++) stars += '<i class="fa-solid fa-star"></i>';
    if (halfStar) stars += '<i class="fa-solid fa-star-half-stroke"></i>';
    for (let i = 0; i < emptyStars; i++) stars += '<i class="fa-regular fa-star"></i>';
    return stars;
  };
}

// Dynamic recommendations
function renderRecommendations(category, currentId) {
  const container = document.getElementById('recommendations-grid');
  if (!container) return;

  const related = products
    .filter(p => p.category === category && p.id !== parseInt(currentId))
    .slice(0, 4);

  if (related.length === 0) {
    // If no related products in category, just recommend any 4 best sellers
    const fallbacks = products.filter(p => p.id !== parseInt(currentId)).slice(0, 4);
    renderGridHelper(container, fallbacks);
  } else {
    renderGridHelper(container, related);
  }
}

function renderGridHelper(targetContainer, productList) {
  targetContainer.innerHTML = '';
  productList.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
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
          <div class="stars" style="color: var(--star-color)">
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
    targetContainer.appendChild(card);
  });

  // Bind add-to-cart in recommendations
  targetContainer.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.target.closest('.add-to-cart-btn').dataset.id;
      addToCart(id, 1, true);
    });
  });

  // Bind wishlist buttons in recommendations
  if (typeof initWishlistButtons === 'function') {
    initWishlistButtons();
  }
}

// Recently Viewed Products History
function updateRecentlyViewed(productId) {
  let viewed = JSON.parse(localStorage.getItem('hoopzone_viewed')) || [];
  const id = parseInt(productId);
  
  // Remove duplicate if it exists and push to top of stack
  viewed = viewed.filter(v => v !== id);
  viewed.unshift(id);
  
  // Cap at 4 items
  viewed = viewed.slice(0, 4);
  localStorage.setItem('hoopzone_viewed', JSON.stringify(viewed));

  renderRecentlyViewedUI();
}

function renderRecentlyViewedUI() {
  const container = document.getElementById('recently-viewed-grid');
  if (!container) return;

  const viewedIds = JSON.parse(localStorage.getItem('hoopzone_viewed')) || [];
  
  // Exclude current page product if possible, but let's just grab the products matching viewed IDs
  const urlParams = new URLSearchParams(window.location.search);
  const currentId = parseInt(urlParams.get('id') || 1);

  const list = products.filter(p => viewedIds.includes(p.id) && p.id !== currentId).slice(0, 4);

  if (list.length === 0) {
    const parentSection = container.closest('.section');
    if (parentSection) parentSection.style.display = 'none';
    return;
  }

  renderGridHelper(container, list);
}

/* Contact Page form validations */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !message) {
      showToast("Please fill in all required fields.", "error");
      return;
    }

    if (!validateEmail(email)) {
      showToast("Please provide a valid email address.", "error");
      return;
    }

    // Simulate success
    showToast("Message sent successfully! We will get back to you shortly.", "success");
    form.reset();
  });
}

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
