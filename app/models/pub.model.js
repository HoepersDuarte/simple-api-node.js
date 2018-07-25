const mongoose = require('mongoose');

const PubSchema = mongoose.Schema({
    name: String,
    local: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Pub', PubSchema);