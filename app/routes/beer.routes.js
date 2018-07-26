module.exports = (app) => {
    const beer = require('../controllers/beer.controller.js');

    // Create a new
    app.post('/beer', beer.create);

    // Retrieve all 
    app.get('/beers', beer.findAll);

    // Retrieve a single with Id
    app.get('/beer/:beerId', beer.findOne);

    // Retrieve a pubs with beer
    app.get('/beer/:beerId/pubs', beer.findPubs);

    // Retrieve a pubs with beer
    app.put('/beer/:beerId/pubs', beer.updatePubs);
    
    // Update with Id
    app.put('/beer/:beerId', beer.update);

    // Delete with Id    
    app.delete('/beer/:beerId', beer.delete);
}