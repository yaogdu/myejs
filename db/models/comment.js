module.exports = function(db,cb){  
  db.define('t_comment',{  
	  id:Number,  
	  user_id:Number,
	  commented_user:Number,
	  goods_id:Number,
	  content:String,
	  status:Number,
	  comment_time:String
  },{
	  id : "id"
  });  
  return cb();  
};  