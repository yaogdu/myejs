module.exports = function(db,cb){  
  db.define('t_goods',{  
	  id:Number,  
	  category:Number,
	  title:String,
	  ori_price:String,
	  price:String,
	  usage:Number,
	  postion:String,
	  province:Number,
	  city:Number,
	  contact:String,
	  mobile:String,
	  ship_fee:String,
	  sale_status:Number,
	  goods_status:Number,
	  user_id:Number,
	  trade_way:Number,
	  description:String,
	  publish_time:String
  },{
	  id : "id"
  });  
  return cb();  
};  