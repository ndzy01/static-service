var express = require('express');
var app = express();
app.use('/', express.static(__dirname + '/public'));
app.use('/react', express.static(__dirname + '/react'));
app.listen(6688);
