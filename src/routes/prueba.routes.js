const {Router} = require('express');

const pruebaRouter = Router();

pruebaRouter.get('/', (req, res) => {
    res.send('Hola mundo');
});


module.exports = {
    pruebaRouter,
};
