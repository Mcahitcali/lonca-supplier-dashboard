const OrderModel = require('../models/order.model');

class OrderController {
    async findAll(req, res) {
        try {
            const orders = await OrderModel.findAll();
            res.json(orders);
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch orders" });
        }
    }

    async findById(req, res) {
        try {
            const order = await OrderModel.findById(req.params.id);
            res.json(order);
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch order" });
        }
    }
}

module.exports = new OrderController();