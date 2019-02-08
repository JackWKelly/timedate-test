const services = require('./services');
const utils = require('./utils');
const moment = require('moment');

var exports = module.exports = {};

exports.hello = function(req, res) {
    services.helloWorld()
        .then(function(data){
            res.send(`${data}`);
            console.log(`${data}`);
        })
        .catch(function(err){
            res.status(500);
            res.send(`PANIC: ${err}`);
        })
}

//sends the time in 12 hour format 
exports.getTime = function(req,res){
    var timeZone = req.query.zone.toString();

    services.getTimeData(timeZone)
        .then(function(data){
            var dateTime = moment.parseZone(data.currentDateTime);
            var time = utils.parseTime(dateTime);
            res.send(`${time}`);
            console.log(`${time}`);
        })
        .catch(function(err){
            res.status(500);
            res.send(`PANIC: ${err}`);
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
        var dateTime = moment.parseZone(data.currentDateTime);

        var time = utils.parseTime(dateTime);
        output = output.concat(`The time is: ${time}\n`);

        var date = utils.parseDate(dateTime);
        output = output.concat(`The date is: ${date}\n`);

        const THURSDAY = 4;
        const FRIDAY = 5
        if(dateTime.day() < THURSDAY){
            output = output.concat(`You have ${FRIDAY - dateTime.day()} days to go until Friday!\n`);
        }
        else if(dateTime.day() == THURSDAY){
            output = output.concat(`You have ${FRIDAY - dateTime.day()} day to go until Friday!\n`);
        }

        return services.getDateFacts(utils.parseHistoryApiDate(dateTime));

    })
    .then(function(data){
        //unsure if the logic for the selection should be here, or in the service as it is now
        output = output.concat(`Something that happened today many years ago: ${services.selectRandomFact(data)}\n`);
        console.log(output);
        res.send(output);
    })

    .catch(function(err){
        console.log(`PANIC ${err}`);
        res.status(500);
        res.send(`PANIC: ${err}`);
    })
}