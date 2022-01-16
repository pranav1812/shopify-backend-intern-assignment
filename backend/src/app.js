const express= require('express');
const cors= require('cors');

const app= express();

app.use(express.json());
// req size limit increased for handling media files
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

app.get('/', (req, res)=> res.send("Inventory Server Running"));

module.exports= app;