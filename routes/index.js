var express = require('express');
var router = express.Router();
var logger = require('../logger').logger('index');



/* GET home page. */
router.get('/', function(req, res) {
    console.log("This is an index page!");
    logger.info("This is an index page! -- log4js");
    console.log('PID:'+process.pid);
    res.render('index', { title: 'Navigation' ,image:'/images/1.JPG',height:'200px',width:'260px',href:'./users'});
    
    
    
    //res.writeHead(200,{"Content-Type":"application/json;charset=utf-8"});
    //res.charset = 'UTF-8';
    //res.write(JSON.stringify('{"Content-Type":"application/json;charset=utf-8"}'));
    //res.end();   
    //res.json('{"Content-Type":"application/json;charset=你好吗"}');
});




router.post('/',function(req,res){
    logger.info('router.post invoked!')
    
    res.end('succeed!', 'UTF-8'); 
});

module.exports = router;
