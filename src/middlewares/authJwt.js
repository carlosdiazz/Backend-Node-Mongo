const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const {SECRET_JWT} = require('../config/config');
const userModel = require('../db/model/user.model');
const roleModel = require('../db/model/role.model');

const verifyToken = async(req, res, next) => {
    try{
        const token = req.headers['x-access-token'];
        if(!token){
            throw boom.unauthorized('No tienes autorización');
        }
        const decoded = await jwt.verify(token, SECRET_JWT);

        if(!decoded){
            throw boom.unauthorized('No tienes autorización');
        }
        req.userId = decoded.id;
        const user = await userModel.findById(req.userId, {password: 0});
        if(!user){
            throw boom.unauthorized('Usuario no Encontrado');
        }

        next();
    }catch(err){
        next(err);
    }
}

const isModerator = async(req, res, next) => {
    try{
        const user = await userModel.findById(req.userId, {password: 0});
        const roles = await roleModel.find({_id: {$in: user.role}});

        for(let i = 0; i < roles.length; i++){
            if(roles[i].name === 'admin'){
                next();
                return;
            }
        }
        throw boom.unauthorized('No tiene el Rol de Moderador');

    }catch(err){
        next(err);
    }
}

const isAdmin = async(req, res, next) => {
    try{
        const user = await userModel.findById(req.userId, {password: 0});
        const roles = await roleModel.find({_id: {$in: user.role}});

        for(let i = 0; i < roles.length; i++){
            if(roles[i].name === 'admin'){
                next();
                return;
            }
        }
        throw boom.unauthorized('No tiene el Rol de Administrador');

    }catch(err){
        next(err);
    }
}


module.exports = {
    verifyToken,
    isModerator,
    isAdmin
}
