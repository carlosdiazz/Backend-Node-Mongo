const Joi = require('joi');

const username = Joi.string().min(3).max(30);
const email = Joi.string().email();
const password = Joi.string().min(8).max(30);
const roles = Joi.array().items(Joi.number().min(0).max(100));
const idSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);

const createUserSchema = Joi.object({
    username: username.required(),
    email: email.required(),
    password: password.required(),
    roles: roles
});

const updateUserSchema = Joi.object({
    username: username,
    email: email,
    password: password,
    roles: roles
});

const getUserSchema = Joi.object({
    id: idSchema.required()
});

module.exports = {
    createUserSchema,
    updateUserSchema,
    getUserSchema
};