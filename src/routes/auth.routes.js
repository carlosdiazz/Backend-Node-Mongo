const {Router} = require('express')
const {validar} = require('../libs/validate');
const {createUserSchema,  signInSchema} = require('../schemas/auth.schema');
const authRouter = Router()
const {signin, signup} = require('../services/auth.service')

//Register
authRouter.post(
    '/signup',
    validar(createUserSchema, 'body'),
    signup
)

//Login
authRouter.post(
    '/signin',
    validar(signInSchema, 'body'),
    signin
)

module.exports = {
    authRouter
}