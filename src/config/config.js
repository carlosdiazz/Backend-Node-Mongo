require('dotenv').config();

const PORT = process.env.PORT || 3000;
const URI = process.env.URI || '';
const SECRET_JWT = process.env.SECRET_JWT || '';
const EXPIRE_JWT = process.env.EXPIRE_JWT || 84600;

module.exports = {
    PORT,
    URI,
    SECRET_JWT,
    EXPIRE_JWT
};
