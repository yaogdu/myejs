var express = require('express');
var router = express.Router();
var logger = require('../logger').logger('index');
var multer = require('multer');//upload files
var crypt = require('../crypt');//crypt
var goodsDao = require('../db/goodsDao');
var resourceDao = require('../db/resourceDao');
var fs = require('fs');

router.use(multer({dest :'./uploads/',
    rename : function (fieldname,filename){
        console.log(fieldname);
        console.log(filename);
        return "goods_"+Date.now();
    }}));


router.get('/toPublish', function (req,res){
    res.render('goods');
});

router.post('/publish', function (req,res){
    var goods = req.body;
    var user = req.user;
    var f = req.files.goods_pic;
    console.log('request files is:'+JSON.stringify(req.files));
    goods["user_id"] = user.id;
    var resource = {};
    resource["file_name"] = f.original_name;
    resource["type"] = 0;
    resource["file_size"] = f.size;
    resource["format"] = f.extension;
    resource["md5"] = f.name;
    goodsDao.insertItems(goods,function(err,data){
       if(err){
           deleteFile('./uploads/'+req.files.name);
           logger.info('delete file from ./uploads/'+f.name);
           res.json({msg:'error happened'});
       }
        resource["goods_id"] = data["id"];
        resourceDao.insertItems(resource,function(err){
           if(err){
               deleteFile('./uploads/'+req.files.name);
               logger.info('delete file from ./uploads/'+f.name);
               res.json({msg:'error happened'});
           }
            res.json({msg:'successfully published goods'+ JSON.stringify(data)});
        });
    });
    //userDao.getUserByCellphone(user["cellphone"],function(err,data){
    //    if(err){
    //        deleteFile('./uploads/'+user["avatar"]);
    //
    //        res.json({msg:'error happened!'});
    //    }
    //    console.log(data);
    //    if(data.length > 0){
    //        res.json({msg:'user already exists!'});
    //    }else{
    //        userDao.insertItems(user,function(err){
    //            if(err){
    //                deleteFile('./uploads/'+user["avatar"]);
    //                res.json({msg:'register error'});
    //            }else{
    //                res.json({msg:'register success!'});
    //            }
    //        });
    //
    //    }
    //
    //});
});


router.get('/',function(req,res){
    goodsDao.getItems(function(err,goods){
        if(err){
            res.json({msg:'error happened'});
        }else{
            res.json(goods);
        }

    });
});

router.get('/:id',function(req,res){
    var id = req.param("id");
    if(isNaN(id)){
        res.json({msg:'goods not exist'});
    }else{
        goodsDao.getItem(id,function(err,goods){
            if(err){
                res.json({msg:'error happened'});
            }else{
                goods[0].getResources(function(err, resources) {
                   console.log(resources);
                });
                console.log(JSON.stringify(goods));
                //console.log(goods);
                res.json(goods);
            }
        });
    }

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