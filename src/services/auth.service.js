const boom = require('@hapi/boom');
const userModel = require('../db/model/user.model');
const roleModel = require('../db/model/role.model');
const {sucessResponse} = require('../libs/response');
const jwt = require('jsonwebtoken');
const {SECRET_JWT, EXPIRE_JWT} = require('../config/config');

// Aqui se crea el token y se crea el usuario
const signup = async (req, res, next) => {
    try{
        const {email, password, username, role} = req.body;

        const userFound = await userModel.findOne({email});
        if(userFound){
            throw boom.badRequest('El usuario ya existe');
        }

        const newUser = new userModel({
            username,
            email,
            password: await userModel.encryptPassword(password),
        });

        if(role){
            const foundRoles = await roleModel.find({name: {$in: role}});
            newUser.role = foundRoles.map(role => role._id);
        }else{
            const role = await roleModel.findOne({name: 'user'});
            newUser.role = [role._id];
        }

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

const signin = async (req, res, next) => {
    try {
        const {email, password} = req.body;

        const userFound = await userModel.findOne({email}).populate('role');

        if(!userFound){
            throw boom.unauthorized('El usuario no existe');
        }

        const matchPassword = await userModel.comparePassword(password, userFound.password);
        if(!matchPassword){
            throw boom.unauthorized('Contraseña incorrecta');
        }

        const token = jwt.sign({id: userFound._id}, SECRET_JWT, {
            expiresIn: EXPIRE_JWT
        });

        sucessResponse(req, res, token, 'Iniciaste correctamente', 200);
    }catch (err) {
        next(err);
    }
}

module.exports = {
    signin,
    signup
}