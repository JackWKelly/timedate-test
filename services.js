const request = require('request');

var exports = module.exports = {};

exports.helloWorld = function(){
    return new Promise(function(resolve,reject){
        resolve("Hello world!");
    });
}

exports.getTimeData = function(zone){
    return new Promise(function(resolve, reject){
        request(`http://worldclockapi.com/api/json/${zone}/now`, {json: true}, function (err, res, body){
            if(err) {
                reject(err);
            }
            resolve(body);
        });
    })
}