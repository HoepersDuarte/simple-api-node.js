const Pub = require('../models/pub.model.js');
const Beer = require('../models/beer.model.js');

exports.create = (req, res) => {
    if (!req.body.name || !req.body.address) {
        return res.status(400).send({
            message: "Pub name and address can not be empty"
        });
    }

    if (!req.body.localMap) {
        req.body.localMap = ''
    }

    if (!req.body.beers) {
        req.body.beers = []
    }

    const pub = new Pub({
        name: req.body.name,
        localMap: req.body.localMap,
        address: req.body.address,
        beers: req.body.beers
    });

    pub.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Pub."
            });
        });
};

exports.findAll = (req, res) => {
    Pub.find()
        .then(pubs => {
            res.send(pubs);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving pubs."
            });
        });
};

exports.findOne = (req, res) => {
    Pub.findById(req.params.pubId)
        .then(pub => {
            if (!pub) {
                return res.status(404).send({
                    message: "Pub not found with id " + req.params.pubId
                });
            }
            res.send(pub);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Pub not found with id " + req.params.pubId
                });
            }
            return res.status(500).send({
                message: "Error retrieving pub with id " + req.params.pubId
            });
        });
};

exports.findBeers = (req, res) => {
    Pub.findById(req.params.pugId)
        .then(pub => {
            if (!pub) {
                return res.status(404).send({
                    message: "Pub not found with id " + req.params.pugId
                });
            }
            const beersArray = []
            const arrayTest = pub.beers
            arrayTest.forEach(id => {
                Beer.findById(id)
                    .then(beer => {
                        if (!beer) {
                            beersArray.push('');
                        }
                        beersArray.push(beer);
                        console.log(beer);
                    }).catch(err => {
                        beersArray.push('');
                    });
            });
            res.send(beersArray);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Pub not found with id " + req.params.pugId
                });
            }
            return res.status(500).send({
                message: "Error retrieving pub with id " + req.params.pugId
            });
        });
};

exports.updateBeers = (req, res) => {
    if (!req.body.beers) {
        return res.status(400).send({
            message: "beers can not be empty"
        });
    }

    Pub.findByIdAndUpdate(req.params.pugId, {
        beers: req.body.beers
    }, { new: true })
        .then(pub => {
            if (!pub) {
                return res.status(404).send({
                    message: "Pub not found with id " + req.params.pugId
                });
            }
            res.send(pub);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Pub not found with id " + req.params.pugId
                });
            }
            return res.status(500).send({
                message: "Error updating pub with id " + req.params.pugId
            });
        });
};

exports.update = (req, res) => {
    if (!req.body.name || !req.body.address || !req.body.localMap) {
        return res.status(400).send({
            message: "Pub name, localMap and address can not be empty"
        });
    }

    Pub.findByIdAndUpdate(req.params.pubId, {
        name: req.body.name,
        address: req.body.address,
        localMap: req.body.localMap
    }, { new: true })
        .then(pub => {
            if (!pub) {
                return res.status(404).send({
                    message: "Pub not found with id " + req.params.pubId
                });
            }
            res.send(pub);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Pub not found with id " + req.params.pubId
                });
            }
            return res.status(500).send({
                message: "Error updating pub with id " + req.params.pubId
            });
        });
};

exports.delete = (req, res) => {
    Pub.findByIdAndRemove(req.params.pubId)
        .then(pub => {
            if (!pub) {
                return res.status(404).send({
                    message: "Pub not found with id " + req.params.pubId
                });
            }
            res.send({ message: "Pub deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Pub not found with id " + req.params.pubId
                });
            }
            return res.status(500).send({
                message: "Could not delete pub with id " + req.params.pubId
            });
        });
};