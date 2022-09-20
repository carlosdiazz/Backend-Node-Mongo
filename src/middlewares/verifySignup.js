const boom = require('@hapi/boom');
const {roles} = require('../db/model/role.model');


const checkRolesExisted = (req, res, next) => {
    try{
        if(!req.body.roles){
            throw boom.badRequest('No se puede asignar un rol');
        }
        for (let i = 0; i < req.body.roles.length; i++) {
            if(!roles.includes(req.body.roles[i])){
                throw boom.badRequest(`El rol ${req.body.roles[i]} no existe`);
            }
        }
        next();
    }catch(err){
        next(err);
    }
}

module.exports = {
    checkRolesExisted
}
