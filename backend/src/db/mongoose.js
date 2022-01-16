const mongoose = require('mongoose');

const { MONGOOSE_URL }= require('../utils/config');

mongoose.connect(MONGOOSE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,   
})

mongoose.connection.on('open', () => {
    console.log('Mongoose connected to ', MONGOOSE_URL);
});

mongoose.connection.on('error', (err) => {
    console.error('Error occured while connecting to Mongo:- ', err.message);
});