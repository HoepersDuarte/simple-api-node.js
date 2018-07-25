const Pub = require('../models/pub.model.js');

exports.create = (req, res) => {
    if (!req.body.local) {
        return res.status(400).send({
            message: "Pub local can not be empty"
        });
    }

    const pub = new Pub({
        name: req.body.name,
        local: req.body.local
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

exports.update = (req, res) => {
    if (!req.body.local) {
        return res.status(400).send({
            message: "Pub local can not be empty"
        });
    }

    Pub.findByIdAndUpdate(req.params.pubId, {
        name: req.body.name,
        local: req.body.local
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
