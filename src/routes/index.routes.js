const {Router} = require('express');
const boom = require('@hapi/boom');
const {productsROUTER} = require('./products.routes')


const routerAPI = (app) => {
    const routerV1 = Router();

    app.use('/api/v1', routerV1);
       routerV1.use('/products',productsROUTER)

    app.all('*', (req, res, next) => {
        next(boom.notFound('La ruta no existe'));
    });
}

module.exports = {
    routerAPI,
};