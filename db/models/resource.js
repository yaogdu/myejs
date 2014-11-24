module.exports = function(db,cb){  
  db.define('t_resource',{  
	  id:Number,  
	  goods_id:Number,
	  file_name:String,
	  type:Number,
	  file_size:Number,
	  format:String,
	  md5:String,
	  publish_time:String
  },{
	  id : "id"
  });  
  return cb();  
};  