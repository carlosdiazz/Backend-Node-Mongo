
const boom = require('@hapi/boom');

const validar = (schema, property) => {
  return (req, res, next) => {

    const data = req[property];
    const {error} = schema.validate(data, {abortEarly: false}); //con esta propiedad abortEarly le decimos que nos envie todos los errores a la vez

    if(error){
      next(boom.badRequest(error));
    }
    next();
  }
}

module.exports = {
    validar
};
