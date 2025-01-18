const express = require('express');
const vendorRoutes = require('./routes/vendor.routes');
const orderRoutes = require('./routes/order.routes');
const productRoutes = require('./routes/product.routes');
const errorHandler = require('./middleware/error.middleware');
require('dotenv').config();

const app = express();

app.use(express.json());

// Routes
app.use('/api/vendors', vendorRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the API' });
});

app.use(errorHandler);

module.exports = app; 