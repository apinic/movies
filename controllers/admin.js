var request = require('request');
module.exports.login = function(req, res) {
  if (req.method === 'POST') {
    var email = req.body.email;
    var password = req.body.password;
    if (process.env.APINIC_MOVIES_AUTH_EMAIL !== email) {
      res.flash('danger', 'Datos inválidos');
      res.render('login');
    }
    else if (process.env.APINIC_MOVIES_AUTH_PASSWORD !== password) {
      res.flash('danger', 'Datos inválidos');
      res.render('login');
    }
    else {
      req.session.user = 1;
      res.redirect('/admin');
    }
  }
  else {
    req.session.flash = [];
    res.render('login');
  }
};

module.exports.home = function(req, res) {
  res.locals.accessToken = process.env.APINIC_MOVIES_ACCESS_TOKEN;
  if (req.method === 'POST') {
    request.post('http://localhost:5000/v1/movie/add',
      {
        form:req.body
      },
      function(error, response, body) {
        if (error) {
          res.flash('danger', error.message);
        }
        else {
          var json = JSON.parse(body);
          if (json.error) {
            res.flash('danger', json.error);
          }
          else {
            res.flash('success', 'Registro guardado!');
          }
        }
        res.render('index');
      }
    );
  }
  else {
    res.render('index');
  }
};
