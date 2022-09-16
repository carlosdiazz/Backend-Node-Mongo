const express = require('express');
const cors = require('cors');
const {routerAPI} = require('../routes/index.routes');
const {logErrors,errorHandler,boomErrorHandler  } = require('../middlewares/error.middlewares');
const morgan = require('morgan');


const app = express();

//Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

//Rutas
routerAPI(app);

//Middlewares de error
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

// Settings
module.exports = app;