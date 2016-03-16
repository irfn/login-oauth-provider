var nohm = require('nohm').Nohm;


module.exports = nohm.model('AuthorizationCode', {
    idGenerator: 'increment',
    properties: {
        code: {
            type: 'string',
            unique: true
        },
        clientID: {
            type: 'string'
        },
        redirectURI: {
            type: 'string'
        },
        userID: {
            type: 'string'
        }
    },
    methods: {
        findByCode: function(code, callback){
            var self = this;
            this.find({
                code: code
            }, function(err, ids) {
                if (ids.length === 0) {
                    callback(err, null);
                } else {
                    self.load(ids[0], function(err) {
                        if (!err) {
                            callback(null, self.allProperties());
                        } else {
                            callback(err, null);
                        }
                    });
                }
            });
        },
        deleteByCode: function(code, callback){
            var self = this;
            this.find({
                code: code
            }, function(err, ids) {
                if (ids.length === 0) {
                    callback(err, null);
                } else {
                    self.load(ids[0], function(err) {
                        if (!err) {
                            self.remove(function(e){
                                callback(e, null);
                            });
                        } else {
                            callback(err, null);
                        }
                    });
                }
            });
        },

        store: function(props, done){
            var code = nohm.factory('AuthorizationCode');
            code.p(props);
            code.save(function (err) {
                if (err === 'invalid') {
                    console.log('properties were invalid: ');
                    done(code.errors, null)
                } else if (err) {
                    console.log(err);
                    done(err, null)
                } else  {
                    done(null, code);
                }
            });
        }
    }
});