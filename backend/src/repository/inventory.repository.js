const Inventory= require('../model/inventory.model');

// return [data, error] for efficient error handling

const getInventoryRecordById= async (itemId) => {
    try {
        var item= await Inventory.findById(itemId);
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

const getAllInventoryRecords= async (page, pageLimit) => {
    try {
        var items= await Inventory.find({}).skip(page * pageLimit).limit(pageLimit);
        return [items, null];
    } catch (error) {
        console.log(`Error in getAllInventoryRecords: ${error.message}`);
        return [null, error.message];
    }
}

const addInventoryRecord= async (newObj) => {
    try {
        var newRecord= new Inventory(newObj);
        var newRecordSaved= await newRecord.save();
        return [newRecordSaved._id, null];
    } catch (error) {
        console.log(`Error in addInventoryRecord: ${error.message}`);
        return [null, error.message];
    }
}

const updateInventoryRecord= async (itemId, newObj)=> {
    try {
        var item= await Inventory.findByIdAndUpdate(itemId, newObj, {new: true});
        return [item._id, null];
    } catch (error) {
        console.log(`Error in updateInventoryRecord: ${error.message}`);
        return [null, error.message];
    }
}

const deleteInventoryRecord= async (itemId) => {
    try {
        var item= await Inventory.findByIdAndDelete(itemId);
        return [item._id, null];
    } catch (error) {
        console.log(`Error in deleteInventoryRecord: ${error.message}`);
        return [null, error.message];
    }
}

module.exports= {
    getInventoryRecordById,
    getAllInventoryRecords,
    addInventoryRecord,
    updateInventoryRecord,
    deleteInventoryRecord,
}

