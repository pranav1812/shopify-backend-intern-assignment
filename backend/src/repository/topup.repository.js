const TopupInventory= require('../model/topupInventory.model');

// return [data, error] for efficient error handling

const getTopupInventoryRecordById= async (itemId) => {
    try {
        var item= await TopupInventory.findById(itemId);
        if (!item) {
            console.log(`Item with id: ${itemId} not found`);
            return [null, "NOT_FOUND"];
        }
        return [item, null];
    } catch (error) {
        console.log(`Error in getByItemById: ${error.message}`);
        return [null, error.message];
    }
}

const getAllTopupInventoryRecords= async (page, pageLimit) => {
    try {
        var items= await TopupInventory.find({}).skip(page * pageLimit).limit(pageLimit);
        return [items, null];
    } catch (error) {
        console.log(`Error in getAllInventoryRecords: ${error.message}`);
        return [null, error.message];
    }
}

const addTopupInventoryRecord= async (newObj) => {
    try {
        console.log(newObj);
        var newRecord= new TopupInventory(newObj);
        var newRecordSaved= await newRecord.save();
        return [newRecordSaved._id, null];
    } catch (error) {
        console.log(`Error in addInventoryRecord: ${error.message}`);
        return [null, error.message];
    }
}

module.exports= {
    getTopupInventoryRecordById,
    getAllTopupInventoryRecords,
    addTopupInventoryRecord
}