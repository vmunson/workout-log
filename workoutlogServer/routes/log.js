var router = require('express').Router();
var sequelize = require('../db');
var Log = sequelize.import('../models/log');
var User = sequelize.import('../models/user');
var Definition = sequelize.import('../models/definition');

router.post('/', function(req, res) {
	var description = req.body.log.desc;
	var date = req.body.log.date
	var distance = req.body.log.distance
    var time = req.body.log.time; 
    var user = req.user;
	var definition = req.body.log.def;
	var heart = req.body.log.heart

    // Use our sequlize model to create user
   Log 
	    .create({ 
			description: description,
			date: date,
			distance: distance,
	    	time: time,
	    	owner: user.id,
			def: definition,
			heart: heart	    
		})
	    .then(
	    	function createSuccess(log) {
	    		res.json(log);
	    	}, 
		    function createError(err) {
		        res.send(500, err.message);
		    }
	    );
});

router.get('/', function(req, res) {
	var userid = req.user.id;
	Log
	.findAll({
		where: { owner: userid }
	})
	.then(
		function findAllSuccess(data) {
			// console.log(data);
			res.json(data);
		},
		function findAllError(err) {
			res.send(500, err.message);
		}
	);
});
router.get('/:id', function(req,res){
	let data = req.params.id
	Log
		.findOne({
			where:{id: data}
		}).then(
			function getSuccess(updateData){
				res.json(updateData)
			},
			function getError(err){
				res.send(500, err.message)
			}
		)

})
router.put('/', function(req, res){
	let description = req.body.log.desc
	let date = req.body.log.date
	let distance = req.body.log.distance
	let time = req.body.log.time
	let data = req.body.log.id
	let definition =req.body.log.def
	let heart = req.body.log.heart
	console.log(req)
	Log
		.update({
			description: description,
			date: date,
			distance: distance,
			time: time,
			def: definition,
			heart: heart
		},
		{where: {id: data}}
	).then(
		function updateSuccess(updatedLog){
			res.json(updatedLog)
		},
		function updateError(err){
			res.send(500, err.message)
		}
	)
})
router.delete('/', function(req, res){
	let data = req.body.log.id
	Log
	.destroy({
		where: {id: data}
	}).then(
		function deleteLogSuccess(data){
			res.send('you removed a log')
		},
		function deleteLogError(err){
			res.send(500, err.message)
		}
	)
})
module.exports = router;