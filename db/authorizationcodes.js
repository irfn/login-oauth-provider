var AuthorizationCode = require('./models/authorizationCode');


exports.find = function(key, done) {
    new AuthorizationCode().findByCode(key, done);
};

exports.save = function(code, clientID, redirectURI, userID, done) {
    new AuthorizationCode().store({ code: code ,clientID: clientID, redirectURI: redirectURI, userID: userID }, done);
};

exports.delete = function(key, done) {
    new AuthorizationCode().deleteByCode(key, done);
};
