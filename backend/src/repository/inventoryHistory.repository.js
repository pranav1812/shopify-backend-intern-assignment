const InventoryHistory = require('../model/inventoryHistory.model');

// return [data, error] for efficient error handling

const getDeletedRecordById = async (id) => {
    try {
        var item= await InventoryHistory.findById(id);
        if (!item) {
            console.log(`Item with id: ${id} not found`);
            return [null, "NOT_FOUND"];
        }
        return [item, null];
    } catch (error) {
        console.log(`Error in getDeletedRecordById: ${error.message}`);
        return [null, error.message];
    }
}

const getAllDeletedInventoryRecords = async (page, pageLimit) => {
    try {
        var items = await InventoryHistory.find({}).skip(page * pageLimit).limit(pageLimit);
        return [items, null];
    } catch (error) {
        console.log(`Error in getAllDeletedInventoryRecords: ${error.message}`);
        return [null, error.message];
    }
}

const deleteAnInventoryRecord = async (obj) => {
    try {
        // add that record to inventoryHistory
        obj['deletion_timestamp'] = new Date();
        var newRecord= new InventoryHistory(obj);
        var newRecordSaved= await newRecord.save();
        return [newRecordSaved._id, null];
    } catch (error) {
        console.log(`Error in deleteAnInventoryRecord: ${error.message}`);
        return [null, error.message];
    }
}

const undoDeleteInventoryRecord = async (id) => {
    try {
        var item= await InventoryHistory.findByIdAndDelete(id);
        return [item._id, null];
    } catch (error) {
        console.log(`Error in undoDeleteInventoryRecord: ${error.message}`);
    }
}

module.exports= {
    getDeletedRecordById,
    getAllDeletedInventoryRecords,
    deleteAnInventoryRecord,
    undoDeleteInventoryRecord
}