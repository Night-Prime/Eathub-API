const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Controller
const OrdersController = require('../controllers/orders');

// GET Request
router.get('/', OrdersController.get_all_orders);

// POST Request
router.post('/', OrdersController.create_order);

// single-order GET request
router.get('/:orderId', OrdersController.get_order);

// single-order PATCH request
router.patch('/:orderId', OrdersController.patch_order);
 
// single-order DELETE request
router.delete('/:orderId', OrdersController.delete_order);


module.exports = router;