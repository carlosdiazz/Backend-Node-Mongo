const {Router} = require('express')
const {validar} = require('../libs/validate');
const {createUserSchema, getUserSchema, updateUserSchema} = require('../schemas/auth.schema');
const authRouter = Router()
const {signin, signup} = require('../services/auth.service')

//Register
authRouter.post(
    '/signup',
    //! me falta validar el body
    //!validar(createUserSchema, 'body'),
    signup
)

//Login
authRouter.post(
    '/signin',
    //!validar(createUserSchema, 'body'),
    //! me falta validar el body
    signin
)

module.exports = {
    authRouter
}