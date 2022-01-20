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
        console.log(`obj: ${JSON.stringify(obj, null, 2)}`);
        // remove _id from obj
        obj= JSON.parse(JSON.stringify(obj));
        var toSave= {
            deletion_timestamp: new Date(),
        }
        Object.keys(obj).forEach(key => {
            toSave[key]= obj[key];
        })

        console.log('-----------------')
        // concat the {deletion_timestamp: new Date()} with the obj
        var newRecord= new InventoryHistor(toSave);
        console.log(newRecord);
        var newRecordSaved= await newRecord.save();
        // console.log("saved deleted record")
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