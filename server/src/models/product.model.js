const { client } = require('../config/database');
const { ObjectId } = require('mongodb');

class ProductModel {
    constructor() {
        this.collection = client.db("lonca").collection("parent_products");
    }

    async findAll() {
        try {
            return await this.collection.find({}).toArray();
        } catch (error) {
            console.error("Error fetching products:", error);
            throw error;
        }
    }

    async findById(id) {
        try {
            console.log("id", id);
            return await this.collection.findOne({ _id: new ObjectId(id.toString()) });
        } catch (error) {
            console.error("Error fetching product:", error);
            throw error;
        }
    }
}

module.exports = new ProductModel(); 