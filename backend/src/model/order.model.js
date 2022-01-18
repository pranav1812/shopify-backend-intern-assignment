const mongoose = require('mongoose');
const {
    ORDER_STATUS_ENUM
}= require('../utils/constants');

// orders are used to track reduction of inventory
const orderSchema = new mongoose.Schema({
    item_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Item',
    },
    units_ordered: {
        type: Number,
        required: true,
    },
    time_stamp: {
        type: Date,
        required: true,
    }
});

module.exports= mongoose.model('Order', orderSchema);