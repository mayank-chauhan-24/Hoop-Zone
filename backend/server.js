require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Models
const Product = require('./models/Product');
const Order = require('./models/Order');
const Contact = require('./models/Contact');
const User = require('./models/User');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey123';

// Routes

// --- Auth Routes ---
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    user = new User({ name, email, password });
    await user.save();
    
    const payload = { userId: user._id, role: user.role };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
    
    res.status(201).json({ token, user: { id: user._id, name, email, role: user.role } });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    const payload = { userId: user._id, role: user.role };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
    
    res.json({ token, user: { id: user._id, name: user.name, email, role: user.role } });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: 'Server error' });
  }
});

// 1. Get all products
app.get('/api/products', async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};
    if (category) {
      query.category = category;
    }
    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: 'Server error fetching products' });
  }
});

// 2. Get a single product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: 'Server error fetching product' });
  }
});

// 3. Submit an order
app.post('/api/orders', async (req, res) => {
  try {
    const { customerInfo, cartItems, totalAmount } = req.body;
    
    // In a real app, you might calculate totalAmount on the server 
    // to prevent tampering, but we'll trust the client for now.
    
    const order = new Order({
      customerInfo,
      cartItems,
      totalAmount
    });
    
    await order.save();
    res.status(201).json({ message: 'Order created successfully', orderId: order._id });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: 'Server error creating order' });
  }
});

// 4. Submit contact form
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const contact = new Contact({ name, email, message });
    await contact.save();
    res.status(201).json({ message: 'Message saved successfully' });
  } catch (error) {
    console.error("Error saving contact message:", error);
    res.status(500).json({ error: 'Server error saving contact message' });
  }
});

// Database Connection & Server Start
const { MongoMemoryServer } = require('mongodb-memory-server');

async function startServer() {
  try {
    let mongoUri = process.env.MONGODB_URI;
    
    if (!mongoUri) {
      console.log("No MONGODB_URI found. Starting an in-memory MongoDB instance...");
      const mongoServer = await MongoMemoryServer.create();
      mongoUri = mongoServer.getUri();
      console.log("In-memory MongoDB started at:", mongoUri);
    }

    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');
    
    const seedDatabase = require('./seed');
    await seedDatabase();
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }
}

startServer();
