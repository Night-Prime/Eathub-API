const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

// used in processing file request
const storage = multer.diskStorage({
    destination: function(req, file ,cb ) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({storage: storage, limits:{
    fileSize: 1024 * 1024 * 5
}, fileFilter: fileFilter });


/* Controller */
const ProductController = require('../controllers/products');

// GET Request
router.get('/', ProductController.get_all_products);

// POST Request
router.post('/', upload.single('productImg'), ProductController.create_product);

// single-product GET request
router.get('/:productId', ProductController.get_product);

// single-product PATCH request
router.patch('/:productId', ProductController.edit_product);

// single-product DELETE request
router.delete('/:productId', ProductController.delete_product);

module.exports = router;