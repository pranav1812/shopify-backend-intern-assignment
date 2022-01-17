const {
    ItemRepository,
    OrderRepository,
    InventoryHistoryRepository,
    InventoryRepository,
    TopupRepository,
}= require('../repository')

const getAll = async (req, res) => {}

const getSpecificItem = async (req, res) => {}

const undoDelete = async (req, res) => {}

const addItemToInventory = async (req, res) => {}

const topupInventory = async (req, res) => {}

const hardUpdateItemInventory = async (req, res) => {}

const deleteItemFromInventory = async (req, res) => {}

module.exports= {
    getAll,
    getSpecificItem,
    undoDelete,
    addItemToInventory,
    topupInventory,
    hardUpdateItemInventory,
    deleteItemFromInventory,
}