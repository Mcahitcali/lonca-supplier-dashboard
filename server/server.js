const { connectToDatabase, client } = require('./src/config/database');
const app = require('./src/index');
require('dotenv').config();

const port = process.env.PORT || 3000;

// Start Server
async function startServer() {
    try {
        const database = await connectToDatabase();
        
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
    await client.close();
    console.log("Disconnected from MongoDB");
    process.exit(0);
});

startServer();