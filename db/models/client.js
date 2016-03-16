var nohm = require('nohm').Nohm;


module.exports = nohm.model('Client', {
    idGenerator: 'increment',
    properties: {
        name: {
            type: 'string',
            unique: true
        },
        clientId: {
            type: 'string',
            unique: true
        },
        clientSecret: {
            type: 'string',
            unique: true
        }
    },
    methods: {
        findById: function(id, callback){
            var found = nohm.factory('Client', id, function (err, obj) {
                if (err === 'not found') {
                    callback(err, null);
                } else if (!err) {
                    callback(null, found.allProperties());
                } else {
                    callback(err, null);
                }
            });

        },
        findByClientId: function(clientId, callback){
            var self = this;
            this.find({
                clientId: clientId
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
            var client = nohm.factory('Client');
            client.p(props);
            client.save(function (err) {
                if (err === 'invalid') {
                    console.log('properties were invalid: ');
                    done(client.errors, null)
                } else if (err) {
                    console.log(err); // database or unknown error
                    done(err, null)
                } else  {
                    done(null, client);
                }
            });
        }
    }
});