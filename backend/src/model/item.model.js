const mongoose = require('mongoose');

const itemSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String, // url: not unique as image can be same for similar items of different size
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['electronics', 'clothes', 'books', 'others']
    },
    is_fragile: {
        type: Boolean,
        required: true,
        default: false
    },
    // this is not for an ecom site, so we do not need to store other size items in the same item as available_sizes
    size: {
        type: String, // (eg. 1kg, 1pc, 750ml, etc)
        required: true,
    },
});

module.exports= mongoose.model('Item', itemSchema);