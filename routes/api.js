/*
 * Serve JSON to our AngularJS client
 */
var dbconfig = require('../db_config');

exports.name = function (req, res) {
  return res.json({
  	name: 'Bob'
  });
};

//Check if we are logged, and return session vars if so
exports.checkLogin = function(req, res){
  console.log(req.session);
	if(req.session.loggedIn){
		return res.json({
			loggedIn: true,
      userId: req.session.loggedIn,
      userName: req.session.userName
		});
	}
	else{
		return res.json({
			loggedIn: false,
		});
	}
}

/* Login: Set session given correct params */
exports.login = function(req, res){
	console.log(req.body);
  console.log(req.body.name);
  console.log(req.body.password);
  
  // Prompt error if we are already logged in (client should prevent this from happening)
  if(req.session.loggedIn){
    return res.json({
      login: false,
      error: 'Login Failed: User already logged in'
    });
  }
  
	dbconfig.User.findOne({ name: req.body.name, password: req.body.password }, function(err, result){
		if(err){
      console.log('login error: ' + err);
			return res.json({
        login: false,
				error: 'login error: ' + err
			});
    }
		if(!result){
      return res.json({
        login: false,
				error: 'User not found or wrong password'
			});
    }
    console.log(result);
    //set sesssion
		req.session.loggedIn = result._id.toString();
    req.session.userName = result.name;
    return res.json({
      login: true,
      userId: req.session.loggedIn,
      userName: req.session.userName
    });
		console.log(result);
	});
  //res.render('index.ejs');
};

exports.logout = function(req, res){
  if(req.session.loggedIn){
    console.log('destroy'); 
    req.session.destroy(); // I have to DESTROY the session to logout
    //req.session.loggedIn = null;  setting session to null doesn't work
    //req.session = null;           Its not manly enough.
    //req.logout();
    res.json({
      logout: true
    });
  }
  else{
    res.json({
      logout: false,
      error: "User is not logged in"
    });
  }
}

/* Register: Add user and set session */
exports.register = function(req, res){
	console.log(req.body);
	if(req.body.password !== req.body.confirm){
		return res.json({
      register: false,
			error: 'Password does not match confirm'
		});
	}
	else{
		var user = new dbconfig.User({ name: req.body.name, password: req.body.password});
		if(!user){ 
			console.log('create user failed');
			return res.json({
        register: false,
				error: 'create user failed'
			});
		}
		user.save(function(err){
			if(err){
				console.log('next( %s )', err);
				return res.json({
          register: false,
					error: 'create user failed'
				});
			}
      console.log(user);
      console.log('Registered');
			req.session.loggedIn = user._id.toString();
      req.session.userName = user.name;
			return res.json({
				register: true,
				userId: req.session.loggedIn,
        userName: req.session.userName
			});
		});
	}
  //res.render('index.ejs');
};