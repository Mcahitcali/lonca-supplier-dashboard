const {client} = require('../config/database');
const { ObjectId } = require('mongodb');

class OrderModel {
    constructor() {
        this.collection = client.db("lonca").collection("orders");
    }

    async findAll() {
        try {
            return await this.collection.find({}).toArray();
        } catch (error) {
            console.error("Error fetching orders:", error);
            throw error;
        }
    }

    async findById(id) {
        try {
            return await this.collection.findOne({ _id: new ObjectId(id.toString()) });
        } catch (error) {
            console.error("Error fetching order:", error);
            throw error;
        }
    }
}

module.exports = new OrderModel();