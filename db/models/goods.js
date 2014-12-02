module.exports = function(db,cb){
  var goods=db.define('t_goods',{
	  id:Number,  
	  category:Number,
	  title:String,
	  ori_price:String,
	  price:String,
	  usage:Number,
	  position:String,
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
  },{
	  autoFetch : true
  });

	//var resource = db.define('t_resource',{
	//	id:Number,
	//	goods_id:Number,
	//	md5:String
	//},{
	//	id:"id"
	//});

	var resource = db.models.resource;
	goods.hasMany('resources',resource ,{ }, { autoFetch:true,key: false,mergeTable:'t_resource',mergeId:'goods_id',getAccessor:'getResources',mergeAssocId:'id'});


  return cb();  
};  