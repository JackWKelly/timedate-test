const moment = require('moment');

var exports = module.exports = {};

exports.parseTime = function(momentData){
    var time = momentData.format("H:mma");
    return time;
}

exports.parseDate = function(momentData){
    var date = momentData.format("DD/MM/YYYY");
    return date;
}

exports.parseHistoryApiDate = function(momentData){
    var apiDate = momentData.format("M/D");
    return apiDate;
}