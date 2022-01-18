const mongoose = require('mongoose');

const inventoryHistorySchema = new mongoose.Schema({
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
    // for offline inventory, etc.
    units_reserved: {
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
        topup: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'TopupInventory',
        },
        comments: {
            type: String,
        }
    }],
    reduction_history: [{
        order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
        },
        comments: {
            type: String,
        }
    }],
    deletion_timestamp: {
        type: Date,
        require: true,
    }
});

module.exports= mongoose.model('InventoryHistory', inventoryHistorySchema);