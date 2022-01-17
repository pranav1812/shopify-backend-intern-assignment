const express= require('express');

const router= express.Router();

router.get('/getItem/:id');

router.post('/addItem');

router.put('/updateItem');

module.exports= router;