const mongoose = require('mongoose');
const {
    ORDER_STATUS_ENUM
}= require('../utils/constants');

const orderSchema = new mongoose.Schema({
    items: [{
        item_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Item',
        },
        units_ordered: {
            type: Number,
            required: true,
        },
    }],
    status: {
        type: String,
        required: true,
        enum: ORDER_STATUS_ENUM,
        default: 'PENDING',
    },
});

module.exports= mongoose.model('Order', orderSchema);