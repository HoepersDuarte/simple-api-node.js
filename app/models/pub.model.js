const mongoose = require('mongoose');

const beerId = [ String ];

const PubSchema = mongoose.Schema({
    name: String,
    localMap: String,
    address: String,
    beers: beerId
}, {
        timestamps: true
    });

module.exports = mongoose.model('Pub', PubSchema);