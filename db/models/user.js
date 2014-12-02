module.exports = function(db,cb){  
  var user=db.define('t_user',{
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



	//var goods = db.define('t_goods',{
	//	id:Number,
	//	user_id:Number,
	//	title:String
	//},{
	//	id:"id"
	//});

	var goods = db.models.goods;
	user.hasMany('goods',goods ,{ user_id:Number}, { autoFetch:true,key: false,mergeTable:'t_goods',mergeId:'user_id',getAccessor:'getGoods',mergeAssocId:'id'});
	//goods.hasMany('resources',resource ,{ }, { autoFetch:true,key: false,mergeTable:'t_resource',mergeId:'goods_id',getAccessor:'getResources',mergeAssocId:'id'});

	return cb();
};  