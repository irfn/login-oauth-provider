var AccessToken = require('./models/accessToken');



exports.find = function(key, done) {
  new AccessToken().findByToken(key, done);
};

exports.save = function(token, userID, clientID, done) {
  new AccessToken().store({ token: token, userID: userID, clientID: clientID }, done);
};
