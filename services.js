//const proxy = require('./proxy');
//const proxyUrl = proxy.getProxy();
const request = require('request');
//const r = require('request');
//const request = r.defaults({'proxy': proxyUrl});

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

exports.selectRandomFact = function(inputJson){
    
    //gets the keys of the json categories
    var categoryKeys = Object.keys(inputJson['data']);

    //select what category key
    var category = categoryKeys[Math.floor(Math.random() * categoryKeys.length)];

    //gets the keys of the selected categories facts
    var factKeys = Object.keys(inputJson['data'][category]);

    //what fact key
    var fact = factKeys[Math.floor(Math.random() * factKeys.length)];

    //get the fact
    var factText = `${category.substring(0, category.length - 1)} - ${inputJson['data'][category][fact]['text']}`;
    return factText;
}

//old
/*exports.selectRandomFact = function(data){
    
    //console.log(data);
    //gets the keys of the json categories
    var categoryKeys = Object.keys(data.data);
    //select what category key
    var category = Math.floor(Math.random() * categoryKeys.length);
    //gets the keys of the selected categories facts
    var factKeys = Object.keys(data.data[category])
    //what fact key
    var fact = Math.floor(Math.random() * factKeys.length);
    //get the fact
    console.log(data.data[category[fact]]);
    var factText = data.data[category[fact]].text;
    return factText;
}*/