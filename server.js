var express = require("express");
var app = express();
app.use(express.static('public'));
app.use('/assets',express.static (__dirname+'/public/assets')); //error
app.use('/api',express.static (__dirname +'/api'));   //error
var server = app.listen(3000, function (){
    var port = server.address().port;
})
