var controllers = require('../controllers');

// validate user session
function checkAuth(req, res, next) {
  if (req.session.user) {
    next();
  }
  else {
    res.redirect('/admin/login');
  }
}

// list of routes
exports.setup = function(app) {
  app.get('/v1/movie/all', controllers['1'].all);
  app.post('/v1/movie/add', controllers['1'].add);
  app.delete('/v1/movie/:id', controllers['1'].delete);

  app.get('/admin/login', controllers.admin.login);
  app.post('/admin/login', controllers.admin.login);
  app.get('/admin', checkAuth, controllers.admin.home);
  app.post('/admin', checkAuth, controllers.admin.home);

  app.get('*', function(req, res) {
    res.status(404).json({error:{message:'Recurso no encontrado.'}});
  });
}
