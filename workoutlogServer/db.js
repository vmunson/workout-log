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

var User = sequelize.import('./models/user.js')
var Definition = sequelize.import('./models/definition.js')
var log = sequelize.import('./models/log.js')
module.exports = sequelize