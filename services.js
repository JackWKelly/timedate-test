var exports = module.exports = {};

exports.helloWorld = function(){
    return new Promise(function(resolve,reject){
        resolve("Hello world!");
    });
}