const {Schema, model} = require('mongoose');

export const roles = ['admin', 'user', 'moderator'];

const roleSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
    versionKey: false
});

module.exports = model('Role', roleSchema);