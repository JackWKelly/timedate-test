const services = require('./services');
const moment = require('moment');

var exports = module.exports = {};

exports.hello =  function(req, res) {
    services.helloWorld()
        .then(function(data){
            res.send(`${data}`);
            console.log(`${data}`);
        })
        .catch(function(err){
            res.send(`PANIC ${err}`);
        })
}

exports.getTime = function(req,res){
    var timeZone = req.query.zone.toString();
    console.log(timeZone);
    
    services.getTimeData(timeZone)
        .then(function(data){
            var dateTime = moment.parseZone(data.currentDateTime);
            var time = dateTime.format("H:mma");
            res.send(`${time}`);
            console.log(`${time}`);
        })
        .catch(function(err){
            res.send(`PANIC ${err}`);
        })
}