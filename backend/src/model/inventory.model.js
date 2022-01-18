const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    item_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Item',
        unique: true,
    },
    units_available: {
        type: Number,
        required: true,
    },
    units_sold: {
        type: Number,
        required: true,
        default: 0,
    },
    units_damaged: {
        type: Number,
        required: true,
        default: 0,
    },
    units_lost: {
        type: Number,
        required: true,
        default: 0,
    },
    // report low stock below threshold level
    threshold: {
        type: Number,
        required: true,
        default: 0,
    },
    topup_history: [{
        topup_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'TopupInventory',
        },
        comments: {
            type: String,
        }
    }],
    reduction_history: [{
        order_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
        },
        comments: {
            type: String,
        }
    }],
});

module.exports= mongoose.model('Inventory', inventorySchema);