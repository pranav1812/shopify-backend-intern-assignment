const InventoryHistor = require('../model/InventoryHistor.model');

// return [data, error] for efficient error handling

const getDeletedRecordById = async (id) => {
    try {
        var item= await InventoryHistor.findById(id).populate('item_id');
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
        var items = await InventoryHistor.find({}).skip(page * pageLimit).limit(pageLimit).populate('item_id');
        return [items, null];
    } catch (error) {
        console.log(`Error in getAllDeletedInventoryRecords: ${error.message}`);
        return [null, error.message];
    }
}

const deleteAnInventoryRecord = async (obj) => {
    try {
        // add that record to InventoryHistor
        obj['deletion_timestamp'] = new Date();
        obj.item_id= obj.item_id._id;
        // remove _id from obj
        delete obj._id;
        console.log(obj);
        console.log('-----------------')
        var newRecord= new InventoryHistor(obj);
        console.log(newRecord);
        var newRecordSaved= await newRecord.save();

        return [newRecordSaved._id, null];
    } catch (error) {
        console.log(`Error in deleteAnInventoryRecord: ${error.message}`);
        return [null, error.message];
    }
}

const undoDeleteInventoryRecord = async (id) => {
    try {
        var item= await InventoryHistor.findByIdAndDelete(id);
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