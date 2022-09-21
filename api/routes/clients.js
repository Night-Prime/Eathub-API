const express = require('express');
const router = express.Router();

// GET Request
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling clients GET requests'
    });
});

// POST Request
router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Handling clients POST requests'
    });
});

// single-clients GET request
router.get('/:clientId', (req, res, next) => {
    res.status(200).json({
        messge: 'Sucessfully grabbed a single clients',
        clientId: req.params.clientId
    });
});

// single-clients PATCH request
router.patch('/:clientId', (req, res, next) => {
    res.status(200).json({
        messge: 'Sucessfully updated this client',
        clientId: req.params.clientId
    });
});

// single-clients DELETE request
router.delete('/:clientId', (req, res, next) => {
    res.status(200).json({
        messge: 'Sucessfully Deleted this client',
        clientId: req.params.clientId
    });
});




module.exports = router;