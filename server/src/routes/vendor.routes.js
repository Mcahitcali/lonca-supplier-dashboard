const express = require('express');
const router = express.Router();
const VendorController = require('../controllers/vendor.controller');

router.get('/', VendorController.getAllVendors);

router.get('/:id', VendorController.getVendorById);

router.get('/:vendorId/sales-summary', VendorController.getVendorSalesSummary);

router.get('/:vendorId/monthly-sales', VendorController.getMonthlyVendorSales);

module.exports = router; 