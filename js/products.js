let products = [];
let productsLoadedPromise = null;

// Fetch products from the new backend API
async function fetchProducts() {
  try {
    const res = await fetch('http://localhost:5000/api/products');
    if (!res.ok) throw new Error('Failed to fetch products');
    products = await res.json();
    return products;
  } catch (error) {
    console.error("Error loading products API, falling back to empty array:", error);
    products = [];
    return products;
  }
}

// Function to initialize products loading. Returns a promise.
function initProducts() {
  if (!productsLoadedPromise) {
    productsLoadedPromise = fetchProducts().then(() => {
      // Dispatch event to notify other scripts that rely on products
      const event = new Event('productsLoaded');
      document.dispatchEvent(event);
    });
  }
  return productsLoadedPromise;
}

// Helper functions for easy access
function getProductById(id) {
  return products.find(p => p.id === parseInt(id));
}

function getRelatedProducts(category, excludeId, limit = 4) {
  return products
    .filter(p => p.category === category && p.id !== parseInt(excludeId))
    .slice(0, limit);
}

function getBestSellers(limit = 4) {
  return products.filter(p => p.isBestSeller).slice(0, limit);
}

function getTopPicks(limit = 4) {
  return products.filter(p => p.isTopPick).slice(0, limit);
}

// Kick off the loading as soon as the file is parsed
initProducts();
