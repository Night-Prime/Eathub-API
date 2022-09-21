const express = require('express');
const router = express.Router();

// GET Request
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling Product GET requests'
    });
});

// POST Request
router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Handling Product POST requests'
    });
});

// single-product GET request
router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    if(id === 'special'){
        res.status(200).json({
            messge: 'Sucessfully grabbed a single product',
            id: id
        });
    } else {
        res.status(404).json({
            Error: 'Product not found, wrong product ID'
        })
    }
});

// single-product PATCH request
router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        messge: 'Sucessfully updated this single product',
    });
});

// single-product DELETE request
router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        messge: 'Sucessfully Deleted this single product',
    });
});




module.exports = router;