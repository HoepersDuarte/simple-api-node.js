const mongoose = require('mongoose');

const BeersSchema = mongoose.Schema({
    name: String,
    description: String,
    alcool: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Beer', BeersSchema);