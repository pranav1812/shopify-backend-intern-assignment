const {
    ItemRepository,
    OrderRepository,
    InventoryHistorRepository,
    InventoryRepository,
    TopupRepository,
}= require('../repository')

const {
    serverErrorResponse,
    successResponse,
    notFoundResponse
}= require('../utils/response')

const getAll = async (req, res) => {
    try {
        var [items, err]= await InventoryRepository.getAllInventoryRecords(req.query.page, req.query.pageLimit);
        if (err) {
            console.log(`Error in getAll: ${err}`);
            return notFoundResponse(res, err);
        }
        return successResponse(res, 'Items Found', items);
    } catch (error) {
        console.log(error.message);
        return serverErrorResponse(res, error.message)
    }
}

const getDeletedInventory = async (req, res) => {
    try {
        var [items, err]= await InventoryHistorRepository.getAllDeletedInventoryRecords(req.query.page, req.query.pageLimit);
        if (err) {
            console.log(`Error in getAll: ${err}`);
            return notFoundResponse(res, err);
        }
        return successResponse(res, 'Items Found', items);
    } catch (error) {
        console.log(error.message);
        return serverErrorResponse(res, error.message)
    }
}

const getSpecificItem = async (req, res) => {
    try {
        var [item, err]= await InventoryRepository.getInventoryRecordById(req.params.id);
        if (err) {
            console.log(`Error in getSpecificItem: ${err}`);
            return notFoundResponse(res, err);
        }
        return successResponse(res, 'Item Found', item);
    } catch (error) {
        console.log(error.message);
        return serverErrorResponse(res, error.message)
    }
}

const undoDelete = async (req, res) => {
    try {
        // check of the item is Present in InventoryHistor
        var [item, err]= await InventoryHistorRepository.getDeletedRecordById(req.params.id);
        if (err) {
            console.log(`Error in undoDelete: ${err}`);
            return notFoundResponse(res, 'Specified Item not found as deleted');
        }
        var [newItemId, err_]= await ItemRepository.addItem(item);
        if (err_) {
            console.log(`Error in undoDelete: ${err_}`);
            return notFoundResponse(res, err_);
        }
        return successResponse(res, 'Item deletion undo successful', newItemId);
    } catch (error) {
        console.log(error.message);
        return serverErrorResponse(res, error.message)
    }
}

const topupInventory = async (req, res) => {
    try {
        var [item, err]= await ItemRepository.getItemById(req.params.id);
        if (err) {
            console.log(`Error in topupInventory: ${err}`);
            return notFoundResponse(res, err);
        }
        // create top up record
        var [topupId, err_]= await TopupRepository.addTopupInventoryRecord(req.body);
        if (err_) {
            console.log(`Error in addItem: ${err}`);
            return serverErrorResponse(res, err);
        }
        item.topup_history.push({
            topup_id: topupId,
            comments: req.body.comments,
        })
        item.units_available= item.units_available + req.body.units_topped_up;
        // update item
        var [itemId, err__]= await ItemRepository.updateItem(item._id, item);
        if (err__) {
            console.log(`Error in addItem: ${err}`);
            return serverErrorResponse(res, err);
        }
        return successResponse(res, 'Topup successful', itemId);
    } catch (error) {
        console.log(error.message);
        return serverErrorResponse(res, error.message)
    }
}

const reduceItemInventory = async (req, res) => {
    try {
        // get item 
        var [item, err]= await ItemRepository.getItemById(req.params.id);
        if (err) {
            console.log(`Error in reduceItemInventory: ${err}`);
            return notFoundResponse(res, err);
        }
        // create order record
        req.body.timestamp= new Date();
        var [order, err_]= await OrderRepository.addOrder(req.body);
        if (err_) {
            console.log(`Error in addItem: ${err}`);
            return serverErrorResponse(res, err);
        }
        item.order_history.push({
            order_id: order._id,
            comments: req.body.comments,
        })
        item.units_available= item.units_available - req.body.units_ordered;
        // update item
        var [itemId, err__]= await ItemRepository.updateItem(item._id, item);
        if (err__) {
            console.log(`Error in addItem: ${err}`);
            return serverErrorResponse(res, err);
        }
        return successResponse(res, 'Order successful', itemId);
    } catch (error) {
        console.log(error.message);
        return serverErrorResponse(res, error.message)
    }
}

const deleteItemFromInventory = async (req, res) => {
    try {
        // get item
        var [item, err]= await InventoryRepository.getInventoryRecordById(req.params.id);
        if (err) {
            console.log(`Error in deleteItemFromInventory: ${err}`);
            return notFoundResponse(res, err);
        }
        // create inventory history record
        var [InventoryHistorId, err_]= await InventoryHistorRepository.deleteAnInventoryRecord(item);
        if (err_) {
            console.log(`Error in deleteItemFromInventory: ${err}`);
            return serverErrorResponse(res, err);
        }
        // delete item from inventory
        var [itemId, err__]= await InventoryRepository.deleteInventoryRecord(item._id);
        if (err__) {
            console.log(`Error in deleteItemFromInventory: ${err}`);
            return serverErrorResponse(res, err);
        }
        return successResponse(res, 'Item deleted successfully', itemId);
    } catch (error) {
        console.log(error.message);
        return serverErrorResponse(res, error.message)
    }
}

module.exports= {
    getAll,
    getDeletedInventory,
    getSpecificItem,
    undoDelete,
    topupInventory,
    reduceItemInventory,
    deleteItemFromInventory,
}