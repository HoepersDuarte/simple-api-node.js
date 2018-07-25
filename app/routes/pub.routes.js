module.exports = (app) => {
    const pub = require('../controllers/pub.controller.js');

    // Create a new
    app.post('/pub', pub.create);

    // Retrieve all 
    app.get('/pubs', pub.findAll);

    // Retrieve a single with Id
    app.get('/pub/:pubId', pub.findOne);

    // Update with Id
    app.put('/pub/:pubId', pub.update);

    // Delete with Id
    app.delete('/pub/:pubId', pub.delete);
}