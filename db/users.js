var User = require('./models/user');

exports.login = function(username, password,  done) {
  new User().login(username, password, done);
};

exports.find = function(id,  done) {
  new User().findById(id, done);
};

exports.add = function(username, email, password,  done) {
  new User().store({username: username, email: email, password: password}, done);
};
