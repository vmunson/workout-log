var router = require('express').Router()
var sequelize = require('../db')
var User = sequelize.import('../models/user.js') 
var Definition = sequelize.import('../models/definition.js')

router.post('/', function(req, res){
    console.log('def post func called')
    var description = req.body.definition.desc
    var logType = req.body.definition.type
    var owner = req.user.id

    Definition
        .create({
            description: description,
            logType: logType,
            owner: owner
        })
        .then(
            function createSuccess(definition){
                res.json({
                    definition: definition
                })
            },
            function createError(err){
                res.send(500, err.message)
            }
        )
})

router.get('/', function(req, res){
    var userId = req.user.id
    console.log("******UserId",userId)
    Definition
        .findAll({
            where: {owner: userId}
        })
        .then(
            function findAllSuccess(data){
                console.log("*********findAll:",data)
                res.json(data)
            },
            function findAllError(err){
                console.log("*********Error:",err)

                res.send(500, err.message)
            }
        )
})

module.exports = router