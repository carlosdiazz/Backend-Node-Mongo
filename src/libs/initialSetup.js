const roleModel = require('../db/model/role.model');


const createRoles = async () => {

    try{
        // Aqui cuentos si hay roles en la base de datos y si no los hay los creo
        const count = await roleModel.estimatedDocumentCount();
        if(count > 0) return;

        const values = await Promise.all([
            new roleModel({name: 'user', description: 'Para los usuarios normales'}).save(),
            new roleModel({name: 'moderator', description: "Para los Gerentes"}).save(),
            new roleModel({name: 'admin', description:"Para los jefes"}).save()
        ]);

    }catch(err){
        console.error(err);
    }

}

module.exports = {
    createRoles
};