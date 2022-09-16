const express = require('express');
const cors = require('cors');
const { PORT } = require('../config/config');
const {routerAPI} = require('../routes/index.routes');
const {logErrors,errorHandler,boomErrorHandler  } = require('../middlewares/error.middlewares');

const appMain = async() => {
    try{
        const app = express();

        //Middlewares
        app.use(express.json());
        app.use(cors());


        //Rutas
        routerAPI(app);

        //Middlewares de error
        app.use(logErrors);
        app.use(boomErrorHandler);
        app.use(errorHandler);

        //Port
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    }catch (error) {
        console.log(error);
    }
}

// Settings
module.exports = {
    appMain,
};