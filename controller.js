const services = require('./services');
var exports = module.exports = {};

exports.hello =  function(req, res) {
    return services.helloWorld()
        .then(function(data){
            res.send(`${data}`);
            console.log(`${data}`);
        })
        .catch(function(err){
            res.send(`PANIC ${err}`);
        })
}