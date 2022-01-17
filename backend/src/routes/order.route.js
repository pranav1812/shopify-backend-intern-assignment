const express= require('express');

const {
    getOrderDetails,
    getAll,
    placeOrder,
    updateOrder,
}= require('../controller/order.controller');

const router= express.Router();

router.get('/getOrderDetails/:id', getOrderDetails);

router.get('/getAll', getAll);

router.post('/placeOrder', placeOrder);

router.put('/updateOrder', updateOrder); // update order status

module.exports= router;