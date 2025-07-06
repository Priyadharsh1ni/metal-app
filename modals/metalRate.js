const mongoose = require('mongoose');

const metalRateSchema = new mongoose.Schema({
    metal: {
        type: String,
        required: true,
        enum: ['Gold', 'Silver', 'Platinum', 'Palladium']
    },
    purity:{
        type: String,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    rateDate: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    change:{
        type: Number,
    }
}, { timestamps: true });

module.exports = mongoose.model('MetalRate', metalRateSchema);