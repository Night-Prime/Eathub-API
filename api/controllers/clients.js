const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // generating web tokens

// Model
const Client = require('../models/client');

exports.client_sign_up = (req, res, next) => {
    Client.find({email: req.body.email})
    .exec()
    .then(client => {
        if(client >= 1){
            return res.status(409).json({
                messae: 'This Email already Exists'
            })
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err){
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    const client = new Client({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    });
                    client.save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: 'Client account successfully created',
                            createdClient : {
                                _id: result._id,
                                email: result.email,
                                password: result.password
                            }
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
                };
            });
        };
    });
};

exports.client_login = (req, res) => {
    Client.find({email:req.body.email})
    .exec()
    .then(client => {
        if(client.lenth < 1){
            return res.status(401).json({
                message: 'Auth Failed'
            });
        }
        bcrypt.compare(req.body.password, client[0].password, (err,result) => {
            if(err){
                return res.status(401).json({
                    message: 'Auth Failed'
                });
            }
            if(result){
                const token = jwt.sign({
                    email: client[0].email,
                    userId: client[0]._id
                }, process.env.JWT_KEY, {
                    expiresIn: "1h"
                })
               return res.status(401).json({
                message: 'Auth Sucessful',
                token: token
               });
            }
            return res.status(401).json({
                message: 'Auth Failed'
            });
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: err.message
        })
    });
};

exports.delete_client = (req, res) => {
    Client.remove({_id: req.params.clientId})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'User Deleted successfully',
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
};