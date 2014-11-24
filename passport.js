var passport = require('passport')
, LocalStrategy = require('passport-local').Strategy;
var log4js = require('./logger');
var logger = log4js.logger('passport');
var userDao = require('./db/userDao');
passport.serializeUser(function (user, done) {//保存user对象
	logger.info('serializeUser');
	done(null, user);//可以通过数据库方式操作
});

passport.deserializeUser(function (user, done) {//删除user对象
	logger.info('deserializeUser');
	done(null, user);//可以通过数据库方式操作
});

passport.isLoggedIn = function(req, res, next) {
	logger.info('isLoggedIn:'+req.isAuthenticated());
	console.log('PID:'+process.pid);
	if (req.isAuthenticated())
		return next();
	
	//res.json('{"msg":"failed"}');
	res.redirect('/');
}
passport.use('local', new LocalStrategy(
	function (username, password, done) {
		
		userDao.getUserByCellphone(username,function(err,data){			
			if(err){
			  logger.info("error is happened");
			  logger.log("login err msg is:"+err);
			  return ;
			}
		
		if(data.length>0){
			var user= data[0];
			if (username !== user.cellphone) {
				console.log('user cellphone is not correct');
				return done(null, false, { message: 'Incorrect username.' });
			}
			if (password !== user.passwd) {
				console.log('user passwd is not correct');
				return done(null, false, { message: 'Incorrect password.' });
			}
			
			console.log('user cellphone is done');
				return done(null, user);
		}else{
			//res.json('{msg:user doesn\'t exist!!}');
			//console.log('User doesn\'t exist.');
			return done(null, false, { message: 'User doesn\'t exist.' });

		}
		
		});
	}
	
));
 
 
 
module.exports = passport ;