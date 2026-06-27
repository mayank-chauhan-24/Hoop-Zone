// Auth JS - Handles Login, Register, and Session Management

const API_URL = 'http://localhost:5000/api';

// Check if user is logged in
function isAuthenticated() {
  return !!localStorage.getItem('hoopzone_token');
}

// Get current user info
function getCurrentUser() {
  const user = localStorage.getItem('hoopzone_user');
  return user ? JSON.parse(user) : null;
}

// Login
async function login(email, password) {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    const data = await res.json();
    
    if (!res.ok) {
      throw new Error(data.error || 'Login failed');
    }
    
    localStorage.setItem('hoopzone_token', data.token);
    localStorage.setItem('hoopzone_user', JSON.stringify(data.user));
    
    return { success: true, user: data.user };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: error.message };
  }
}

// Register
async function register(name, email, password) {
  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    
    const data = await res.json();
    
    if (!res.ok) {
      throw new Error(data.error || 'Registration failed');
    }
    
    localStorage.setItem('hoopzone_token', data.token);
    localStorage.setItem('hoopzone_user', JSON.stringify(data.user));
    
    return { success: true, user: data.user };
  } catch (error) {
    console.error('Register error:', error);
    return { success: false, error: error.message };
  }
}

// Logout
function logout() {
  localStorage.removeItem('hoopzone_token');
  localStorage.removeItem('hoopzone_user');
  window.location.reload();
}

// Update Navbar UI based on auth state
function updateAuthUI() {
  const navMenu = document.querySelector('.nav-menu');
  if (!navMenu) return;
  
  // Find if there's a login link or my account link
  const existingLoginLink = Array.from(navMenu.querySelectorAll('.nav-link')).find(el => el.textContent.trim().toLowerCase() === 'login' || el.textContent.trim().toLowerCase() === 'my account');
  
  if (existingLoginLink) {
    if (isAuthenticated()) {
      const user = getCurrentUser();
      existingLoginLink.innerHTML = `<i class="fa-solid fa-user"></i> Hi, ${user.name.split(' ')[0]}`;
      existingLoginLink.href = '#';
      
      // Add a logout button if it doesn't exist
      if (!document.getElementById('logout-btn')) {
        const logoutLi = document.createElement('li');
        logoutLi.innerHTML = `<a href="#" id="logout-btn" class="nav-link" style="color: var(--danger);"><i class="fa-solid fa-arrow-right-from-bracket"></i> Logout</a>`;
        navMenu.appendChild(logoutLi);
        
        document.getElementById('logout-btn').addEventListener('click', (e) => {
          e.preventDefault();
          logout();
        });
      }
    } else {
      existingLoginLink.innerHTML = `<i class="fa-solid fa-user"></i> Login`;
      existingLoginLink.href = 'login.html';
      
      const logoutBtn = document.getElementById('logout-btn');
      if (logoutBtn) {
        logoutBtn.parentElement.remove();
      }
    }
  } else {
    // If there is no login link at all in the navbar, let's append one
    const loginLi = document.createElement('li');
    if (isAuthenticated()) {
      const user = getCurrentUser();
      loginLi.innerHTML = `<a href="#" class="nav-link"><i class="fa-solid fa-user"></i> Hi, ${user.name.split(' ')[0]}</a>`;
      
      const logoutLi = document.createElement('li');
      logoutLi.innerHTML = `<a href="#" id="logout-btn" class="nav-link" style="color: var(--danger);"><i class="fa-solid fa-arrow-right-from-bracket"></i> Logout</a>`;
      
      navMenu.appendChild(loginLi);
      navMenu.appendChild(logoutLi);
      
      document.getElementById('logout-btn').addEventListener('click', (e) => {
        e.preventDefault();
        logout();
      });
    } else {
      loginLi.innerHTML = `<a href="login.html" class="nav-link"><i class="fa-solid fa-user"></i> Login</a>`;
      navMenu.appendChild(loginLi);
    }
  }
}

// Initialize Auth UI when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  updateAuthUI();
});
