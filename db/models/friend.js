module.exports = function(db,cb){  
  db.define('t_friend',{  
	  id:Number,  
	  user_id:Number,
	  friend_id:Number,
	  friend_name:String,
	  create_time:String
  },{
	  id : "id"
  });  
  return cb();  
};  