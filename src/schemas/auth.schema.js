const Joi = require('joi');

const username = Joi.string().min(3).max(30);
const email = Joi.string().email();
const password = Joi.string().min(8).max(30);
const role = Joi.array().items(Joi.string().valid('admin', 'user','moderator'));
const idSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);

const createUserSchema = Joi.object({
    username: username.required(),
    email: email.required(),
    password: password.required(),
    role: role
});

const updateUserSchema = Joi.object({
    username: username,
    email: email,
    password: password,
    role: role
});


const signInSchema = Joi.object({
    email: email.required(),
    password: password.required()
});

module.exports = {
    createUserSchema,
    updateUserSchema,
    signInSchema
};