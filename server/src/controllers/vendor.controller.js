const VendorModel = require('../models/vendor.model');
const vendorService = require('../services/vendor.service');
const VendorService = require('../services/vendor.service');

class VendorController {
    async getAllVendors(req, res) {
        try {
            const vendors = await VendorModel.findAll();
            res.json(vendors);
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch vendors" });
        }
    }

    async getVendorById(req, res) {
        try {
            const vendor = await VendorModel.findById(req.params.id);
            if (!vendor) {
                return res.status(404).json({ error: "Vendor not found" });
            }
            res.json(vendor);
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch vendor" });
        }
    }

    async getVendorSalesSummary(req, res, next) {
        try {
            const { vendorId } = req.params;
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            
            const salesSummary = await vendorService.getVendorSalesSummary(vendorId, page, limit);
            res.json(salesSummary);
        } catch (error) {
            next(error);
        }
    }

    async getMonthlyVendorSales(req, res, next) {
        try {
            const { vendorId } = req.params;
            const { startDate, endDate } = req.query;
            
            const monthlySales = await VendorService.getMonthlyVendorSales(vendorId, startDate, endDate);
            res.json(monthlySales);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new VendorController(); 