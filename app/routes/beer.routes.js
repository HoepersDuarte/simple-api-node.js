module.exports = (app) => {
    const beer = require('../controllers/beer.controller.js');

    app.post('/beer', beer.create);

    app.get('/beers', beer.findAll);

    app.get('/beer/:beerId', beer.findOne);

    app.put('/beer/:beerId', beer.update);

    app.delete('/beer/:beerId', beer.delete);
}