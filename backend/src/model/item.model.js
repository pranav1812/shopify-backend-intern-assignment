const mongoose = require('mongoose');
const {
    ITEM_CATEGORY_ENUM
}= require('../utils/constants');

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
    category: {
        type: String,
        required: true,
        enum: ITEM_CATEGORY_ENUM,
    }
});

module.exports= mongoose.model('Item', itemSchema);