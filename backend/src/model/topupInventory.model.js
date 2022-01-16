const mongoose = require('mongoose');

// top up orders 
const topupInventorySchema = new mongoose.Schema({
    item_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Item',
    },
    units_ordered: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'processing', 'completed', 'cancelled'],
        default: 'pending',
    },
    distrubutor_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Distributor',
    },
});

module.exports= mongoose.model('TopupInventory', topupInventorySchema);