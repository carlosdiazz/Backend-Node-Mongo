require('dotenv').config();

const PORT = process.env.PORT || 3000;
const URI = process.env.URI || '';
const SECRET_JWT = process.env.SECRET_JWT || '';


module.exports = {
    PORT,
    URI,
    SECRET_JWT,

};
