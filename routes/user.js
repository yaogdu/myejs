var express = require('express');
var router = express.Router();
var logger = require('../logger').logger('index');
var multer = require('multer');//upload files
var crypt = require('../crypt');//crypt
var userDao = require('../db/userDao');
var fs = require('fs');

router.use(multer({dest :'./uploads/',
rename : function (fieldname,filename){
    console.log(fieldname);
    console.log(filename);
    return "avatar_"+Date.now();
}}));
router.get('/list', function (req, res) {
var html = "<h2>你好, " + req.user + "</h2><a href='/logout'>退出</a>";
res.send(html);
});

router.get('/toRegister', function (req,res){
    res.render('register');
});

router.post('/register', function (req,res){
    var user = req.body;
    user["passwd"] = crypt.crypt(user["passwd"]);
    user["avatar"] = req.files.headerAvatar.name;
    //user["register_time"] = new Date(parseInt(Date.now()) * 1000).toLocaleString().substr(0,17);
    userDao.getUserByCellphone(user["cellphone"],function(err,data){
        if(err){
            deleteFile('./uploads/'+user["avatar"]);

            res.json({msg:'error happened!'});
        }
        console.log(data);
        if(data.length > 0){
            res.json({msg:'user already exists!'});
        }else{
            userDao.insertItems(user,function(err){
                if(err){
                    deleteFile('./uploads/'+user["avatar"]);
                    res.json({msg:'register error'});
                }else{
                    res.json({msg:'register success!'});
                }
            });

        }

    });
    console.log(user);
});

router.get('/self',function(req,res){
    var user = req.user;
    if(!user){
        res.json({msg:'please log in!'});
    }else{
        var id = user.id;
        userDao.getItem(id,function(err,data){
            if(err){
                res.json({msg:'error occurred when look for your info'});
            }else{
                res.json(data);
            }
        });
    }
});

router.get('/',function(req,res){
    userDao.getItems(function(err,users){
        if(err){
            res.json({msg:'error happened!'});
        }else{
            res.json(users);
        }
    });


});

function deleteFile(fileUrl){
    fs.unlink(fileUrl,function(err){
        if(err){
            logger.info('error while unlink avatar file:'+fileUrl);
        }
    });
}

//router.exists('/register', function (req,res){
//    //res.render('register');
//    var user = req.body;
//    user["passwd"] = crypt.crypt(user["passwd"]);
//    user["avatar"] = req.files.headerAvatar.name;
//    user["register_time"] = Date.now();
//
//    console.log(user);
//});

module.exports=router;