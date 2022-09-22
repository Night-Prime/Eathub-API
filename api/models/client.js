const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {type: String, required: true},
    password: {type: String, required: true}
});

module.exports = mongoose.model('Client', clientSchema);