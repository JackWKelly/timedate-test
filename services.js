const request = require('request');

/*
//proxy configuration, have proxy.js/getProxy() return the URL, gitignored for privacy
const proxy = require('./proxy');
const proxyUrl = proxy.getProxy();
const r = require('request');
const request = r.defaults({'proxy': proxyUrl});
*/

var exports = module.exports = {};

//test function
exports.helloWorld = function(){
    return new Promise(function(resolve,reject){
        resolve("Hello world!");
    });
}

//returns json full of time/date data
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

/*
takes numeric date format 'M/D'
returns a json with historic deaths, events and births
*/
exports.getDateFacts = function(date){
    return new Promise(function(resolve, reject){
        request.get(`http://history.muffinlabs.com/date/${date}`, {json: true}, function (err, res, body){
            if(err) {
                reject(err);
            }
            resolve(body);
        });
    })
}

//selects a random category of event, then returns a random fact's text from that category
exports.selectRandomFact = function(inputJson){
    
    //gets the keys of the json categories
    var categoryKeys = Object.keys(inputJson['data']);

    //select what category
    var category = categoryKeys[Math.floor(Math.random() * categoryKeys.length)];

    //gets the keys of the selected categories facts
    var factKeys = Object.keys(inputJson['data'][category]);

    //what fact
    var fact = factKeys[Math.floor(Math.random() * factKeys.length)];

    //get the fact's text, preceded by what category it is from (minus the plural)
    var factText = `${category.substring(0, category.length - 1)} - ${inputJson['data'][category][fact]['text']}`;
    return factText;
}