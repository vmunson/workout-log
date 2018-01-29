var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.use(require('./middleware/headers'))

app.use('/api/test', function(req,res){
    res.send('Hello World')
})

app.listen(3000, function(){
    console.log("app is open on 3000!")
})

var Sequelize = require('sequelize')
var sequelize = new Sequelize('workoutlog', 'postgres', 'password21',{
    host: 'localhost',
    dialect: 'postgres'
})

sequelize.authenticate().then(
    function(){
        console.log('connected to workoutlog postgres db')
    },
    function(err){
        console.log(err)
    }
)



var User = sequelize.define('user', {
    username: Sequelize.STRING,
    passwordhash: Sequelize.STRING,
}) 
User.sync()
/*
This deletes the user table
// User.sync({force: true})
*/
app.use(bodyParser.json())

app.post('/api/user', function(req, res){
    var user = req.body.user.username
    var pass = req.body.user.password

    User.create({
        username: user,
        passwordhash: pass
    }).then(
        function createSuccess(user){
            res.json({
                user: user,
                message: 'create'
            })
        },
        function createError(err){
            res.send(500, err.message)
        }
    )
})

