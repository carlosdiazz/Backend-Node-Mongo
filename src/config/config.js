require('dotenv').config();

const PORT = process.env.PORT || 3000;
const URI = process.env.URI || '';

module.exports = {
    PORT,
    URI
};
