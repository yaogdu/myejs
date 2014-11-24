var express = require('express');
var router = express.Router();
var logger = require('../logger').logger('index');
var multer = require('multer');
router.use(multer({dest :'./uploads/',
rename : function (fieldname,filename){
    console.log(fieldname);
    console.log(filename);
    return filename + Date.now();
}}));
router.get('/list', function (req, res) {
var html = "<h2>你好, " + req.user + "</h2><a href='/logout'>退出</a>";
res.send(html);
});

router.get('/toRegister', function (req,res){
    res.render('register');
});

router.post('/register', function (req,res){
    //res.render('register');
    console.log(req.body);
    console.log(req.files.headerAvatar.name);
    console.log(req.files);
});

module.exports=router;