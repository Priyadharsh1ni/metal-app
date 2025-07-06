const mongoose = require('mongoose');

const puritySchema = new mongoose.Schema({
    metal: {
        type: String,
        required: true,
    },
    purity: {
        type: String,
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('Purity', puritySchema);