var Client = require('./models/client');

exports.find = function(id, done) {
  return new Client().findById(id, done)
};

exports.findByClientId = function(clientId, done) {
  return new Client().findByClientId(clientId, done);
};


exports.add = function(name, clientId, clientSecret,  done) {
  new Client().store({name: name, clientId: clientId, clientSecret: clientSecret}, done);
};