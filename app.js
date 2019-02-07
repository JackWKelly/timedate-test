const express = require('express');
const app = express();

//load custom dependencies
const routes = require('./routes');

//set api routes
app.use('/api/time', routes);

//catch non valid routes
app.get('*', function(req,res){
    res.send("404");
});

app.listen(port = 3000, function (){
    console.log(`Listening on port ${port}!`);
});