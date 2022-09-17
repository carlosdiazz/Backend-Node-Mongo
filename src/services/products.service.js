const {sucessResponse} = require('../libs/response');
const productModel = require('../db/model/product.model');
const boom = require('@hapi/boom');

const createProduct = async (req, res, next) => {
    try{
        const {name, category, price, imgUrl} = req.body;
        const product = new productModel({name, category, price, imgUrl});
        const productSaved = await product.save();
        if(!productSaved){
            throw boom.badImplementation('Error al crear el producto');
        }
        sucessResponse(req, res, productSaved, 'Producto creado correctamente', 201);
    }
    catch(err){
        next(err);
    }
}

const updateProductById = async(req, res, next) => {
    try{
        const { id } = req.params;
        const { name, category, price, imgUrl } = req.body;

        const product = await productModel.findById(id);
        if(!product){
            throw boom.notFound('Producto no encontrado');
        }
        const productUpdate = await productModel.findByIdAndUpdate(id, {name, category, price, imgUrl}, {new: true});
        if(!productUpdate){
            throw boom.badImplementation('Error al actualizar el producto');
        }
        sucessResponse(req, res, productUpdate, 'Producto actualizado correctamente', 200);
    }
    catch(err){
        next(err);
    }
}

const deleteProductById = async (req, res, next) => {
    try{
        const { id } = req.params;

        const product = await productModel.findById(id);
        if(!product){
            throw boom.notFound('Producto no encontrado');
        }

        const product_delete = await productModel.findByIdAndDelete(id);
        if(!product){
            throw boom.badImplementation('Error al eliminar el producto');
        }
        sucessResponse(req, res, product_delete, 'Producto eliminado correctamente', 200);
    }
    catch(err){
        next(err);
    }
}

const getProductById = async(req, res, next) => {
    try{
        const { id } = req.params;
        const product = await productModel.findById(id);
        if(!product){
            throw boom.notFound('Producto no encontrado');
        }
        sucessResponse(req, res, product, 'Producto obtenido correctamente', 200);
    }
    catch(err){
        next(err);
    }
}

const getProducts = async (req, res, next) => {
    try{
        const products = await productModel.find();
        if(!products){
            throw boom.notFound('No se encontraron productos');
        }
        sucessResponse(req, res, products, 'Productos obtenidos correctamente', 200);
    }
    catch(err){
        next(err);
    }
}

module.exports = {
    createProduct,
    updateProductById,
    deleteProductById,
    getProductById,
    getProducts
}