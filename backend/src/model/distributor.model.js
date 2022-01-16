const mongoose = require('mongoose');

const distributorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    zip: {
        type: String,
        required: true,
    },
    website: {
        type: String,
    },
    // no. of orders we placed with this distributor for our inventory
    placed_orders: {
        type: Number,
        default: 0,
    },
    cancelled_orders: {
        type: Number,
        default: 0,
    },
    fulfilled_orders: {
        type: Number,
        default: 0,
    },
});

module.exports= mongoose.model('Distributor', distributorSchema);