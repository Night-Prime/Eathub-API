const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product : { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
    quantity: {type: Number, default: 1},
    delivered: {type: Boolean, default: false},
    cancelled: {type: Boolean, default: false},
    orderTime: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Order', orderSchema);