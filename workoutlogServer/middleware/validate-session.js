var jwt = require('jsonwebtoken');
var sequelize = require('../db');
var User = sequelize.import('../models/user');

module.exports = function (req, res, next) {
    var sessionToken = req.headers.authorization;
    console.log(sessionToken)
    if (!req.body.user && sessionToken) {
        jwt.verify(sessionToken, process.env.JWT_SECRET, function (err, decoded) {
            console.log(err)
            if (decoded) {
                User.findOne({ where: { id: decoded.id } }).then(
                    function (user) {
                        // console.log("User is:")
                        // console.log(user)
                        req.user = user;
                        next();
                    },
                    function () {
                        res.status(401).send({ error: 'Not authorized' });
                    }
                );
            } else {
                res.status(401).send({ error: 'Not token not decoded' });
            }
        });
    } else {
        next();
    }
}

