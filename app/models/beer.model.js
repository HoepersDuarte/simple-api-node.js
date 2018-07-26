const mongoose = require('mongoose');

const pubId = [ String ];

const BeersSchema = mongoose.Schema({
    name: String,
    description: String,
    image: String,
    alcohol: Number,
    pubs: pubId
}, {
    timestamps: true
});

module.exports = mongoose.model('Beer', BeersSchema);