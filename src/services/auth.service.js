const boom = require('@hapi/boom');
const userModel = require('../db/model/user.model');
const {sucessResponse} = require('../libs/response');
const jwt = require('jsonwebtoken');
const {SECRET_JWT, EXPIRE_JWT} = require('../config/config');

const signin = async (req, res, next) => {
    try{
        const {email, password, username, roles} = req.body;

        const userFound = await userModel.findOne({email});
        if(userFound){
            throw boom.badRequest('El usuario ya existe');
        }

        const newUser = new userModel({
            username,
            email,
            password: await userModel.encryptPassword(password),
        });


        const savedUser = await newUser.save();
        if(!savedUser){
            throw boom.badImplementation('Error al crear el usuario');
        }

        const token = jwt.sign({id: savedUser._id}, SECRET_JWT, {
            expiresIn: EXPIRE_JWT
        });

        sucessResponse(req, res, token, 'El usuario se creo correctamente', 200);
    }catch  (err) {
        next(err);
    }
}

const signup = async (req, res, next) => {
    try {
        sucessResponse(req, res, 'Hola', 'Signup', 200);
    }catch (err) {
        next(err);
    }
}

module.exports = {
    signin,
    signup
}