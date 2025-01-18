const ProductModel = require('../models/product.model');

class ProductController {
    async getAllProducts(req, res) {
        try {
            const products = await ProductModel.findAll();
            res.json(products);
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch products" });
        }
    }

    async getProductById(req, res) {
        try {
            const product = await ProductModel.findById(req.params.id);
            if (!product) {
                return res.status(404).json({ error: "Product not found" });
            }
            res.json(product);
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch product" });
        }
    }
}

module.exports = new ProductController(); 