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

//sends the time in 12 hour format 
exports.getTime = function(req,res){
    var timeZone = req.query.zone.toString();

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

/*
sends the 12 hour time, date, how many days in the workweek until friday
and a random fact that happened on that day
*/
exports.getFullReport = function(req,res){
    var timeZone = req.query.zone.toString();

    var output = "";

    services.getTimeData(timeZone)
    .then(function(data){
        //unsure if some of this should be moved into a service
        var dateTime = moment.parseZone(data.currentDateTime);
        var time = dateTime.format("H:mma");
        output = output.concat(`The time is: ${time}\n`);
        var date = dateTime.format("DD/MM/YYYY");
        output = output.concat(`The date is: ${date}\n`);
        if(dateTime.day() < 4){
            output = output.concat(`You have ${5 - dateTime.day()} days to go until Friday!\n`);
        }
        else if(dateTime.day() == 4){
            output = output.concat(`You have ${5 - dateTime.day()} day to go until Friday!\n`);
        }

        var apiDate = dateTime.format("M/D")
        return services.getDateFacts(apiDate);

    })
    .then(function(data){
        //unsure if the logic for the selection should be here, or in the service as it is now
        output = output.concat(`Something that happened today many years ago: ${services.selectRandomFact(data)}\n`);
        console.log(output);
        res.send(output);
    })

    .catch(function(err){
        console.log(`PANIC ${err}`);
    })
}