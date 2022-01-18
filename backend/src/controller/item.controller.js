const {
    ItemRepository,
    InventoryRepository,
    TopupRepository,
}= require('../repository')

const {
    serverErrorResponse,
    successResponse,
    notFoundResponse
}= require('../utils/response')

const getItem= async (req, res) => {
    try {
        var [item, err]= await ItemRepository.getItemById(req.params.id);
        if (err) {
            console.log(`Error in getItem: ${err}`);
            return notFoundResponse(res, err);
        }
        return successResponse(res, 'Item Found', item);
    } catch (error) {
        console.log(error.message);
        return serverErrorResponse(res, error.message)
    }
}

const getAll= async (req, res) => {
    try {
        var [items, err]= await ItemRepository.getAllItems(req.query.page, req.query.pageLimit);
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

const addItem= async (req, res) => {
    try {
        var [itemId, err]= await ItemRepository.addItem(req.body);
        if (err) {
            console.log(`Error in addItem: ${err}`);
            return serverErrorResponse(res, err);
        }
        req.body.item_id= itemId;
        req.body.units_topped_up= req.body.units_available;
        // create topup
        var [topupId, err_]= await TopupRepository.addTopupInventoryRecord(req.body);
        if (err_) {
            console.log(`Error in addItem: ${err}`);
            return serverErrorResponse(res, err);
        }
        req.body.topup_history= [
            {
                topup_id: topupId,
                comments: 'Initial Topup',
            }
        ]
        req.body.reduction_history= [];
        var [inventoryItemId, err__]= await InventoryRepository.addInventoryRecord(req.body);
        if (err__) {
            console.log(`Error in addItem: ${err_}`);
            return serverErrorResponse(res, err_);
        }
        return successResponse(res, 'Item Added', itemId);
    } catch (error) {
        console.log(error.message);
        return serverErrorResponse(res, error.message)
    }
}

const updateItem= async (req, res) => {
    try {
        var [itemId, err]= await ItemRepository.updateItem(req.body._id, req.body);
        if (err) {
            console.log(`Error in updateItem: ${err}`);
            return serverErrorResponse(res, err);
        }
        return successResponse(res, 'Item Updated', itemId);
    } catch (error) {
        console.log(error.message);
        return serverErrorResponse(res, error.message)
    }
}

module.exports= {
    getItem,
    getAll,
    addItem,
    updateItem,
}