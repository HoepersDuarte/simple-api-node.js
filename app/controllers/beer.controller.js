const Beer = require('../models/beer.model.js');

// Create and Save a new Beer
exports.create = (req, res) => {
    // Validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "beer name can not be empty"
        });
    }

    // Create a Beer obj
    const beer = new Beer({
        name: req.body.name, 
        description: req.body.description,
        alcool: req.body.alcool
    });

    // Save Beer in the database
    beer.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the beer."
        });
    });
};

// Retrieve and return all Beeers from the database.
exports.findAll = (req, res) => {
    Beer.find()
    .then(beers => {
        res.send(beers);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving beer."
        });
    });
};

// Find a single beer with a beerId
exports.findOne = (req, res) => {
    Beer.findById(req.params.beerId)
    .then(beer => {
        if(!beer) {
            return res.status(404).send({
                message: "Beer not found with id " + req.params.beerId
            });            
        }
        res.send(beer);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Beer not found with id " + req.params.beerId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving beer with id " + req.params.beerId
        });
    });
};

// Update a beer identified by the beerId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.alcool) {
        return res.status(400).send({
            message: "Beer alcool can not be empty"
        });
    }

    // Find beer and update it with the request body
    Beer.findByIdAndUpdate(req.params.beerId, {
        alcool: req.body.alcool,
    }, {new: true})
    .then(beer => {
        if(!beer) {
            return res.status(404).send({
                message: "Beer not found with id " + req.params.beerId
            });
        }
        res.send(beer);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Beer not found with id " + req.params.beerId
            });                
        }
        return res.status(500).send({
            message: "Error updating beer with id " + req.params.beerId
        });
    });
};

// Delete a beer with the specified beerId in the request
exports.delete = (req, res) => {
    Beer.findByIdAndRemove(req.params.beerId)
    .then(beer => {
        if(!beer) {
            return res.status(404).send({
                message: "Beer not found with id " + req.params.beerId
            });
        }
        res.send({message: "Beer deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Beer not found with id " + req.params.beerId
            });                
        }
        return res.status(500).send({
            message: "Could not delete beer with id " + req.params.beerId
        });
    });
};
