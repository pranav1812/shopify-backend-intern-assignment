const express= require('express');

const {
    getAll,
    getDeletedInventory,
    getSpecificItem,
    undoDelete,
    topupInventory,
    reduceItemInventory,
    deleteItemFromInventory,
}= require('../controller/inventory.controller');

const router= express.Router();

router.get('/getAll', getAll); // query: {page: 1, limit: 10}

router.get('/getDeletedInventory', getDeletedInventory); // query: {page: 1, limit: 10}')

router.get('/getSpecificItem/:id', getSpecificItem); // inventory history, etc for that item

router.get('/undoDelete/:id', undoDelete); // undo delete for _id= id in inventoryHistory

router.put('/topupInventory', topupInventory); // topup inventory

router.put('/reduceItemInventory', reduceItemInventory); // other ways of doing this is via order, topup, etc

router.delete('/deleteItemFromInventory', deleteItemFromInventory); // deleted items will go to inventory history model

module.exports= router;