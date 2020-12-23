var express = require('express');
var router = express.Router();

var authController = require('../controllers/authentication');

// register and login
// router.post('/register', function(req,res){
// 	authController.register(req,res);
// });
router.post('/login', function(req,res){
	authController.login(req,res);
});

module.exports = router;