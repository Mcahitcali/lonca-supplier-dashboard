const VendorModel = require('../models/vendor.model');

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
}

module.exports = new VendorController(); 