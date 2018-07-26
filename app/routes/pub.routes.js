module.exports = (app) => {
    const pub = require('../controllers/pub.controller.js');

    app.post('/pub', pub.create);

    app.get('/pubs', pub.findAll);

    app.get('/pub/:pubId', pub.findOne);

    app.get('/pub/:pugId/beers', pub.findBeers);

    app.put('/pub/:pugId/beers', pub.updateBeers);

    app.put('/pub/:pubId', pub.update);

    app.delete('/pub/:pubId', pub.delete);

}