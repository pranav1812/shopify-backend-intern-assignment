const express= require('express');

const router= express.Router();

router.get('/getOrderDetails/:id');

router.post('/placeOrder');

router.put('/cancelOrder');

module.exports= router;