const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product.controller');

// Get all products
router.get('/', ProductController.getAllProducts);

// Get product by ID
router.get('/:id', ProductController.getProductById);

module.exports = router; 