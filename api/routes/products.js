const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

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


const Product = require('../models/product');

// GET Request
router.get('/', (req, res, next) => {
    Product.find()
    .select('name price _id counts productImg') // filter through the fields
    .exec()
    .then((docs) => {
        const response = {
            counts: docs.length,
            products: docs.map(doc => {
                return {
                    name: doc.name,
                    price: doc.price,
                    description: doc.description,
                    productImg: doc.productImg,
                    _id: doc._id,
                    request: {
                        type: 'GET',
                        url: `https://localhost:${process.env.PORT}/products/` + doc._id
                    }
                }
            })
        }
        if(docs.length >= 0){
            res.status(200).json(response);   
        } else {
            res.status(400).json({message: 'No products found!'});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

// POST Request
router.post('/', upload.single('productImg'), (req, res, next) => {
    console.log(req.file);
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        productImg: req.file.path
    });
    product.save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Created Products successfully',
            createdProduct: {
                name: result.name,
                price: result.price,
                _id: result._id,
                description: result.description,
                request: {
                    type: 'POST',
                    url: `https://localhost:${process.env.PORT}/products/` + result._id
                }
            }
        });
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({error: error})
    });
});

// single-product GET request
router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
    .select('name price _id productImg')
    .exec()
    .then(doc => {
        console.log("From Database ", doc);
        // doing some exception handling over here.
        if(doc){
            res.status(200).json({
                product: doc,
                _id: doc._id,
                name: doc.name,
                price: doc.price,
                description: doc.description,
                request: {
                    type: 'GET',
                    url: `http://localhost:${process.env.PORT}/products/` + doc._id
                }
            });
        } else {
            res.status(404).json({message: 'No Valid Product ID'})
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    })
});

// single-product PATCH request
router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Product.updateOne({_id: id}, {$set: updateOps})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Product updated successfully',
            product: result,
            _id: result._id,
            name: result.name,
            price: result.price,
            description: result.description,
            request: {
                type: 'PATCH',
                url: `http://localhost:${process.env.PORT}/products/` + result._id
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// single-product DELETE request
router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Product removed successfully',
            request: {
                type: 'DELETE',
                url: `http://localhost:${process.env.PORT}/products/` + result._id,
                data: {name: 'String', price: 'Number'}
            }
        });
    })
    .catch(err => {
        res.status(500).json({
            message: err.message
        })
    });
});

module.exports = router;