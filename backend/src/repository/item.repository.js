const Item= require('../model/item.model');

// return [data, error] for efficient error handling

const getItemById= async (itemId) => {
    try {
        var item= await Item.findById(itemId);
        if (!item) {
            console.log(`Item with id: ${itemId} not found`);
            return [null, "NOT_FOUND"];
        }
        return [item, null];
    } catch (error) {
        console.log(`Error in getItemById: ${error.message}`);
        return [null, error.message];
    }
}

const getAllItems= async (page, pageLimit) => {
    try {
        // populate item_id
        var items= await Item.find({}).skip(page * pageLimit).limit(pageLimit).populate('item_id');
        return [items, null];
    } catch (error) {
        console.log(`Error in getAllItems: ${error.message}`);
        return [null, error.message];
    }
}

const addItem= async (newObj) => {
    try {
        var newRecord= new Item(newObj);
        var newRecordSaved= await newRecord.save();
        return [newRecordSaved._id, null];
    } catch (error) {
        console.log(`Error in addItem: ${error.message}`);
        return [null, error.message];
    }
}

const updateItem= async (itemId, newObj)=> {
    try {
        var item= await Item.findByIdAndUpdate(itemId, newObj, {new: true});
        return [item._id, null];
    } catch (error) {
        console.log(`Error in updateItem: ${error.message}`);
        return [null, error.message];
    }
}

const deleteItem= async (itemId) => {
    try {
        var item= await Item.findByIdAndDelete(itemId);
        return [item._id, null];
    } catch (error) {
        console.log(`Error in deleteItem: ${error.message}`);
        return [null, error.message];
    }
}

module.exports= {
    getItemById,
    getAllItems,
    addItem,
    updateItem,
    deleteItem,
}