const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Customer',
    },
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
        enum: ['pending', 'processing', 'completed', 'cancelled'],
        default: 'pending',
    },
});

module.exports= mongoose.model('Order', orderSchema);