module.exports = function(router) {
  router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
  });

  router.route('/cakes')
    .get(function(req, res) {
      res.json({ message: 'cakes!' });
    });

  router.route('/cakes/:cake_id')
    .get(function(req, res) {
      res.json({ message: 'cake-' + req.params.cake_id });
    });
}
