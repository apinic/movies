exports.setup = function(_mongoose, _db) {
  var fileName = require('path').basename(__filename, '.js');

  var schema = _mongoose.Schema({
    'name': String,
    'synopsis': String,
    'front': String,
    'duration': String,
    'clasification': String,
    'genres': String,
    'theaters': [],
    'created_at': {
      'type': Date,
      'default': Date.now
    }
  });

  _db.model(fileName, schema);

  var data = _db.model(fileName);

  return data;
};
