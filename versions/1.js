var models = require('../models');

module.exports.all = function(req, res) {
  models.movies.find({}, function(err, rows) {
    if (err) {
      res.json({error:{message:'El nombre es requerido.'}});
    }
    else {
      res.json(rows);
    }
  });
};

module.exports.add = function(req, res) {
  var name = req.body.name;
  var synopsis = req.body.synopsis;
  var front = req.body.front;
  var duration = req.body.duration;
  var clasification = req.body.clasification;
  var genres = req.body.genres;
  var accessToken = req.body['access_token'];

  if (process.env.APINIC_MOVIES_ACCESS_TOKEN !== accessToken) {
    res.json({error:{message:'access_token inválido.'}});
  }
  else if (name === '') {
    res.json({error:{message:'El nombre es requerido.'}});
  }
  else if (synopsis === '') {
    res.json({error:{message:'La sinompsis es requerida.'}});
  }
  else if (front === '') {
    res.json({error:{message:'La portada es requerdida.'}});
  }
  else if (duration === '') {
    res.json({error:{message:'La duración res requerdida.'}});
  }
  else if (clasification === '') {
    res.json({error:{message:'La clasificación res requerida'}});
  }
  else if (genres === '') {
    res.json({error:{message:'Los géneros son requeridos.'}});
  }
  else {
    var movie = new models.movies;

    movie.name = name;
    movie.synopsis = synopsis;
    movie.front = front;
    movie.duration = duration;
    movie.clasification = clasification;
    movie.genres = genres;

    movie.save(function(err) {
      if (err) {
        res.json({error:{message:err}});
      }
      else {
        res.json({status:true});
      }
    });
  }
};

module.exports.delete = function(req, res) {
  models.movies.remove({_id:req.params.id}, function(err) {
    if (err) {
      res.json({error:{message:err}});
    }
    else {
      res.json({status:true});
    }
  });
};
