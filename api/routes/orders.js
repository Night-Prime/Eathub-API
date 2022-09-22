const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order');
const Product = require('../models/product');

// GET Request
router.get('/', (req, res, next) => {
    Order.find()
    .select('product quantity _id delivered cancelled')
    .exec()
    .then(docs => {
        res.status(200).json({
            counts: docs.length,
            orders: docs.map(doc => {
                return {
                    _id: doc._id,
                    product: doc.product,
                    quantity: doc.quantity,
                    delivered: doc.delivered,
                    cancelled: doc.cancelled,
                    request: {
                        type: 'GET',
                        url: `http://localhost:${process.env.PORT}/orders/` + doc._id
                    }
                }
            })
        });
    })
    .catch(err => {
        res.status(500).json({
            error : err
        });
    });
});

// POST Request
router.post('/', (req, res, next) => {
    // Product has to be available before Order is processed
    Product.findById(req.body.productId)
    .then(product => {
        if(!product) {
            return res.status(404).json({message: 'Product not found'});
        }
        const order = new Order({
            _id: new mongoose.Types.ObjectId(),
            quantity: req.body.quantity,
            product: req.body.productId,
            delivered: req.body.delivered,
            cancelled: req.body.cancelled,
        });
        return order.save()
    })
    .then( result => {
        console.log(result);
        res.status(201).json({
            message: 'Order was successful',
            createdOrder: {
                _id: result._id,
                product: result.product,
            },
            request: {
                type: 'POST',
                url: `http://localhost:${process.env.PORT}/orders/` + result._id
            }
        });
    })
    .catch(err => {
        res.status(500).json({
            message: 'Product has to be available before Order is processed',
            error: err
        });
    });
});

// single-order GET request
router.get('/:orderId', (req, res, next) => {
    res.status(200).json({
        messge: 'Sucessfully grabbed a single order',
        orderId: req.params.orderId
    });

});

// single-order PATCH request
router.patch('/:orderId', (req, res, next) => {
    res.status(200).json({
        messge: 'Sucessfully updated this order',
        orderId: req.params.orderId
    });
});
 
// single-order DELETE request
router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        messge: 'Sucessfully Deleted this  order',
        orderId: req.params.orderId
    });
});


module.exports = router;