/* this handles the middleware processes */

const express = require('express');
const app = express();

const productRoutes = require('./api/routes/products');
app.use('/products', productRoutes );

const clientRoutes = require('./api/routes/clients');
app.use('/clients', clientRoutes );

const orderRoutes = require('./api/routes/orders');
app.use('/orders', orderRoutes );

// Primary Route
app.use((req, res, next) => {
    res.status(400).json({
        message: 'It Works!'
    });
});

module.exports = app;