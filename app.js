var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
//var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('cookie-session')
var routes = require('./routes/index');
var users = require('./routes/users');
var user = require('./routes/user');
var log4js = require('./logger');
var passport = require('./passport');

var app = express();

var logger = log4js.logger('normal');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.set('port',process.env.PORT || 3000);
app.use(favicon());
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret:'localhost',cookie : {maxAge : 6000}}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(log4js.connectLogger(logger, {level:log4js.levels.INFO,format:':method :url'}));


//app.post('/login',passport.authenticate('local',
//    {
//    //successRedirect:'users',
//    //failureRedirect: '/'
//        session:false
//}),
//function(req,res){
//   console.log(req.user);
//});

app.post('/login',function(req,res,next){
    passport.authenticate('local',function(err,user,info){
        if(err){return next(err);}
        if(!user){
            return res.json({'msg':'error'});
        }
        req.logIn(user,function(err){
                if(err){return next(err);
            }
            return res.redirect('/user/list');
        });
    })(req,res,next);
});
    
app.all('/user',passport.isLoggedIn);
app.use('/user',user);
//app.post('/user/register',user);
//app.get('/user/toRegister',user.toRegister);
app.get('/logout',function(req,res){
    logger.info('logout invoked!')
    req.logout();

    res.redirect('/');
});

//app.use('/user',user);
app.use('/', routes);
app.use('/users', users);
//app.use('/users/:id', users);
/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
