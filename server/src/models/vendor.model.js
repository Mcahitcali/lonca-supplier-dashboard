const { client } = require('../config/database');
const { ObjectId } = require('mongodb');

class VendorModel {
    constructor() {
        this.collection = client.db("lonca").collection("vendors");
    }

    async findAll() {
        try {
            return await this.collection.find({}).toArray();
        } catch (error) {
            console.error("Error fetching vendors:", error);
            throw error;
        }
    }

    async findById(id) {
        try {
            console.log("id", id);
            return await this.collection.findOne({ _id: new ObjectId(id.toString()) });
        } catch (error) {
            console.error("Error fetching vendor:", error);
            throw error;
        }
    }
}

module.exports = new VendorModel(); 