var Nohm = require('nohm').Nohm;
var redis = require('redis');
var redisClient = redis.createClient();

Nohm.setPrefix('login-oauth-provider');

redisClient.on("connect", function() {
    Nohm.setClient(redisClient);
    console.log("Nohm Connected to Redis Client");
});

exports.users = require('./users');
exports.clients = require('./clients');
exports.accessTokens = require('./accesstokens');
exports.authorizationCodes = require('./authorizationcodes');

