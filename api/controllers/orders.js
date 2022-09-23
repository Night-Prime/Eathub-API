const mongoose = require('mongoose');

// Models Imports
const Order = require('../models/order');
const Product = require('../models/product');


exports.get_all_orders = (req, res, next) => {
    Order.find()
    .select('product quantity _id delivered cancelled')
    .populate('product') // sending queries to filter by product
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
};

exports.create_order = (req, res, next) => {
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
};

exports.get_order = (req, res, next) => {
    Order.findById(req.params.orderId)
    .exec()
    .then(order => {
        if(!order){
            return res.status(404).json({message: 'Order not found!'})
        }
        res.status(200).json({
            order: order,
            request: {
                type: 'GET',
                url: `http://localhost:${process.env.PORT}/orders/` + order._id
            }
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
};

exports.patch_order = (req, res, next) => {
    const id = req.params.orderId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Order.updateOne({_id: id}, {$set: updateOps})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Product has been updated successfully',
            order: result,
            _id: result._id,
            quantity: result.quantity,
            request: {
                type: 'PATCH',
                url: 'https://localhost:${process.env.PORT}/' + result._id
            }
        })
    })
};

exports.delete_order = (req, res, next) => {
    Order.remove({ _id: req.params.orderId})
    .exec()
    .then(order => {
        res.status(200).json({
            order: order,
            request: {
                message: 'Order removed successfully',
                type: 'DELETE',
                url: `http://localhost:${process.env.PORT}/orders/` + order._id,
                body: {productId: 'ID', quantity:"Number"}
            }
        });
    })
    .catch( err => {
        res.status(500).json({
            error: err
        })
    });
};