/*
 * Serve JSON to our AngularJS client
 */
var dbconfig = require('../db_config');

exports.name = function (req, res) {
  res.json({
  	name: 'Bob'
  });
};

exports.login = function(req, res){
	console.log(req.body);
	var name = req.body.name;
	var password = req.body.password;
	res.json({
		msg: 'LoginResponse'
	});
	/*User.findOne({ email: req.body.user.email, password: req.body.user.password }, function(err, result){
		if(err){ console.log('next( %s )', err); next(err); }
		if(!result) return res.send('<p>Wrong username or password</p>');
		req.session.loggedIn = result._id.toString();
		console.log(result);
		return res.redirect('/');
	});*/
  //res.render('index.ejs');
};

exports.checkLogin = function(req, res){
	if(true){ 
		res.json({
			msg: 'False'
		});
	}
	else{
		console.log('balls');
		res.json({
			msg: 'True'
		});
	}
}

exports.register = function(req, res){
	console.log(req.body);
	var name = req.body.name;
	var password = req.body.password;
	var confirm = req.body.confirm;
	if(password !== confirm){
		res.json({
			msg: 'Password does not match confirm'
		});
	}
	else{
		var user = new dbconfig.User({ name: name, password: password});
		if(!user){ 
			console.log('create user failed');
			res.json({
				msg: 'create user failed'
			});
		}
		user.save(function(err){
			if(err){
				console.log('next( %s )', err);
				res.json({
					msg: 'create user failed'
				});
			}
			req.session.loggedIn = user._id.toString();
			res.json({
				msg: 'user create success!',
				user_id: req.session.loggedIn
			});
		});
	}
  //res.render('index.ejs');
};