var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sequelize = require('./db');

var User = sequelize.import(__dirname + '/models/user');
//Create table
User.sync(); // sync( {force: true}), to drop then create each time the app starts!

app.use(bodyParser.json());
app.use(require('./middleware/headers'));
app.use('/api/user', require('./routes/user'));
app.use('/api/login', require('./routes/sessions'))
app.use('/api/test', function(req, res){
	res.send("Hello World");
});

app.listen(3000, function(){
	console.log('App is listening on 3000.')
});

