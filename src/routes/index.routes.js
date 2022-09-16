const {Router} = require('express');
const boom = require('@hapi/boom');

const {pruebaRouter} = require('../routes/prueba.routes');

const routerAPI = (app) => {
    const routerV1 = Router();

    app.use('/api/v1', routerV1);
       routerV1.use('/prueb',pruebaRouter)

    app.all('*', (req, res, next) => {
        next(boom.notFound('La ruta no existe'));
    });
}

module.exports = {
    routerAPI,
};