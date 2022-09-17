const {Schema, Model} = require('mongoose');

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

module.exports = Model('Role', roleSchema);