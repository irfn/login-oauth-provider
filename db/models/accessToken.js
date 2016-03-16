var nohm = require('nohm').Nohm;


module.exports = nohm.model('AccessToken', {
    idGenerator: 'increment',
    properties: {
        token: {
            type: 'string',
            unique: true
        },
        clientID: {
            type: 'string'
        },
        userID: {
            type: 'string'
        }
    },
    methods: {
        findByToken: function(token, callback){
            var self = this;
            this.find({
                token: token
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

        store: function(props, done){
            var code = nohm.factory('AccessToken');
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