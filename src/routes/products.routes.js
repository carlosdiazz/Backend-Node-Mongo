const {Router} = require('express');

const productsROUTER = Router();
const {getProductById,getProducts,createProduct,updateProductById,deleteProductById} = require('../services/products.service');
const {validar} = require('../libs/validate');
const {createProductSchema, getProductSchema, updateProductSchema} = require('../schemas/product.schemas');

productsROUTER.get(
    '/',
    getProducts
);

productsROUTER.get(
    '/:id',
    validar(getProductSchema, 'params'),
    getProductById
);

productsROUTER.post(
    '/',
    validar(createProductSchema,'body'),
    createProduct
);

productsROUTER.put(
    '/:id',
    validar(getProductSchema, 'params'),
    validar(updateProductSchema, 'body'),
    updateProductById
);

productsROUTER.delete(
    '/:id',
    validar(getProductSchema, 'params'),
    deleteProductById
);

module.exports = {
    productsROUTER
}