const express = require('express');
const router = express.Router();

// GET Request
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling order GET requests'
    });
});

// POST Request
router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Handling order POST requests'
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