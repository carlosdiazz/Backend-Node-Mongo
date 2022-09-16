const mongose = require('mongoose');

const { URI } = require('../config/config');

const connectDB = async () => {
    try{
        await mongose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connected');
    }
    catch(err){
        console.log('Error connecting to database');
        console.log(err);
    }
}

module.exports = connectDB;