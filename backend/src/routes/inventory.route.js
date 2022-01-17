const express= require('express');

const router= express.Router();

router.get('/getAll'); // query: {page: 1, limit: 10}

router.get('/getSpecificItem/:id'); // inventory history, etc for that item

router.get('/undoDelete/:id'); // undo delete for _id= id in inventoryHistory

router.post('/addItemToInventory');

router.put('/topupInventory'); 

router.put('/hardUpdateItemInventory'); // other ways of doing this is via order, topup, etc

router.delete('/deleteItemFromInventory'); // deleted items will go to inventory history model

module.exports= router;