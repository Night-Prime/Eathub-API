/* this handles the middleware processes */
require('dotenv').config();

const express = require('express'); // middleware 
const morgan = require('morgan'); // logging requests
const bodyParser = require('body-parser'); // parsing data into the server
const mongoose = require('mongoose'); // database for the server

// initializing the routes
const productRoutes = require('./api/routes/products');
const clientRoutes = require('./api/routes/clients');
const orderRoutes = require('./api/routes/orders');

// Database Config
const DB_KEY = process.env.DB_URI;
mongoose.connect(DB_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, () => {
    console.log('Database is made available');
});


// middleware functions
const app = express();
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // parsing a JSON response

// handling CORS
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 
//     'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//     );
//     if(req.method === 'OPTIONS'){
//         res.header('Access-Control-Allow-Method', 'PUT, POST, PATCH, DELETE, GET');
//         return status(200).json({});
//     }
// });

// Other Routes
app.use('/clients', clientRoutes );
app.use('/products', productRoutes );
app.use('/orders', orderRoutes );



// Primary Route - Error Handling
app.use((req, res, next) => {
    const error = new Error('Can\'t access');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;