const Joi = require('joi');


const name = Joi.string().min(3).max(30)
const category = Joi.string().min(3).max(30)
const price = Joi.number().min(0).max(1000000)
const imgUrl = Joi.string().min(3).max(1000)
const idSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/)

const createProductSchema = Joi.object({
    name: name.required(),
    category: category.required(),
    price: price.required(),
    imgUrl: imgUrl.required()
})

const updateProductSchema = Joi.object({
    name: name,
    category: category,
    price: price,
    imgUrl: imgUrl
})

const getProductSchema = Joi.object({
    id: idSchema.required()
})

module.exports = {
    createProductSchema,
    updateProductSchema,
    getProductSchema
}