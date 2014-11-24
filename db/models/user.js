module.exports = function(db,cb){  
  db.define('t_user',{  
	  id:Number,  
	  avatar:String,
	  nickname:String,
	  cellphone:String,
	  province:Number,
	  city:Number,
	  passwd:String,
	  name:String,
	  register_time:String
  },{
	  id : "id"
  });  
  return cb();  
};  