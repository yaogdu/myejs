var express = require('express');
var router = express.Router();

var categoryDao = require('../db/categoryDao.js');

var names=['t','t1','t2'];


/* GET users listing. */
router.get('/:id', function(req, res) {
  var id=req.params.id;
  if(id){
      categoryDao.getItem(id,function(err,data){
        if(err){
          res.render('users', {names:["error is happened"]})
          console.log("error is happened");
          console.log(err);
          return ;
        }
        if(!data){
          res.render('users', {names:names})
          return ;
        }
        res.render('users',{names:JSON.stringify(data)});
      });
      
  }else{
      res.render('users', {names:names})
  }
  //res.render('users', {names:names})
  //res.send('respond with a resource');
});

router.get('/', function(req, res) {
  categoryDao.getItems(function(err, data) {
    if(err){
      res.render('users', {names:names});
      return ;
    }
    if(!data){
      res.render('users', {names:names});
      return ;
    }
    res.writeHead(200,{"Content-Type":"application/json;charset=utf-8"});
    res.charset = 'UTF-8';
    res.write(JSON.stringify(data));
    res.end();
    ///res.render('users', {names:JSON.stringify(data)})
  });
  
  //res.render('users', {names:names})
  //res.send('respond with a resource');
});
module.exports = router;
