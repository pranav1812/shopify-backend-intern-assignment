const express= require('express');

const {
    getItem,
    getAll,
    addItem,
    updateItem,
}= require('../controller/item.controller');

const router= express.Router();

router.get('/getItem/:id', getItem);

router.get('/getAll', getAll);

router.post('/addItem', addItem);

router.put('/updateItem', updateItem);

module.exports= router;