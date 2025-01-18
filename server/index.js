require('dotenv').config();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);


async function main() {
    try {
        const database = client.db("lonca");
        const collection = database.collection("vendors");

        console.log("Connected to MongoDB");
    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
        console.log("Disconnected from MongoDB");
    }
}

main();