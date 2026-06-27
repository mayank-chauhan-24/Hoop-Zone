const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true }, // Using the existing integer IDs
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  reviewsCount: { type: Number, default: 0 },
  image: { type: String, required: true },
  images: [{ type: String }],
  description: { type: String },
  features: [{ type: String }],
  isBestSeller: { type: Boolean, default: false },
  isTopPick: { type: Boolean, default: false },
  inStock: { type: Boolean, default: true },
  reviews: [
    {
      user: String,
      rating: Number,
      comment: String,
      date: String
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
