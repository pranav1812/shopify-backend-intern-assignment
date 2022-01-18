const mongoose = require('mongoose');

// top up orders 
const topupInventorySchema = new mongoose.Schema({
    item_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Item',
    },
    units_topped_up: {
        type: Number,
        required: true,
    },
});

module.exports= mongoose.model('TopupInventory', topupInventorySchema);