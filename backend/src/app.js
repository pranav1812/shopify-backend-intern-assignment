const express= require('express');
const cors= require('cors');

const ItemRouter= require('./routes/item.route');
const OrderRouter= require('./routes/order.route');
const InventoryRouter= require('./routes/inventory.route');

const app= express();

app.use(express.json());
// req size limit increased for handling media files
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

app.get('/', (req, res)=> res.send("Inventory Server Running"));
app.use('/item', ItemRouter);
app.use('/order', OrderRouter);
app.use('/inventory', InventoryRouter);

module.exports= app;