const Order = require('../model/order.model');

// return [data, error] for efficient error handling

const getOrderById = async (orderId) => {
    try {
        var order = await Order.findById(orderId);
        if (!order) {
            console.log(`Order with id: ${orderId} not found`);
            return [null, "NOT_FOUND"];
        }
        return [order, null];
    } catch (error) {
        console.log(`Error in getOrderById: ${error.message}`);
        return [null, error.message];
    }
}

const getAllOrders = async (page, pageLimit) => {
    try {
        var orders = await Order.find({}).skip(page * pageLimit).limit(pageLimit);
        return [orders, null];
    } catch (error) {
        console.log(`Error in getAllOrders: ${error.message}`);
        return [null, error.message];
    }
}

const addOrder = async (newObj) => {
    try {
        console.log('------------------------------------');
        console.log(newObj);
        console.log('------------------------------------');
        var newRecord = new Order(newObj);
        var newRecordSaved = await newRecord.save();
        return [newRecordSaved._id, null];
    } catch (error) {
        console.log(`Error in addOrder: ${error.message}`);
        return [null, error.message];
    }
}

const updateOrder = async (orderId, newObj) => {
    try {
        var order = await Order.findByIdAndUpdate(orderId, newObj, { new: true });
        return [order._id, null];
    } catch (error) {
        console.log(`Error in updateOrder: ${error.message}`);
        return [null, error.message];
    }
}

// there's no delete function for orders as order record can be cancelled not deleted

module.exports= {
    getOrderById,
    getAllOrders,
    addOrder,
    updateOrder
}