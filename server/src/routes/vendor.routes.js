const express = require('express');
const router = express.Router();
const VendorController = require('../controllers/vendor.controller');

// Get all vendors
router.get('/', VendorController.getAllVendors);

// Get vendor by ID
router.get('/:id', VendorController.getVendorById);

module.exports = router; 