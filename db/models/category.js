module.exports = function(db,cb){  
  db.define('t_category',{  
	  id:Number,  
	  title:String,
	  parent_id:Number,
	  level:Number
  },{
	  id : "id"
  });  
  return cb();  
};  