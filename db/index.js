var Nohm = require('nohm').Nohm;
var redis = require('redis');
var config = require('config');

var redisConfig = config.get('redis');

var redisClient = redis.createClient(redisConfig);

Nohm.setPrefix('login-oauth-provider');

redisClient.on("connect", function() {
    Nohm.setClient(redisClient);
    console.log("Nohm Connected to Redis Client");
});

exports.users = require('./users');
exports.clients = require('./clients');
exports.accessTokens = require('./accesstokens');
exports.authorizationCodes = require('./authorizationcodes');

