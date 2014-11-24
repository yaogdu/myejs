var orm = require('orm');  
var db = orm.connect("mysql://root:root@localhost/odd");  

var bllTest = {  
	getItem: function (id, cb) {  
		db.load('./models/category', function (err) {  
			if (err) {  
				return cb(err, null);  
			} 
			db.models.t_category.find({"id": id}, 1, function (err, categories) {
				cb(err, category);
			});  
		});  
	},  
	getItems: function (cb) {  
		db.load('./models/category', function (err) {  
			if (err) {  
				return cb(err, null);  
			} 
			db.models.t_category.find(function (err, categories) {
				cb(err, categories);  
			});  
		});  
	},  
	insertItems: function (items, cb) { 
		db.load('./models/category', function (err) {  
			if (err)  
				return  cb(err, null);  

			db.models.t_category.create(items, function (err, resItems) {  
				if (err)  
					return  cb(err, null);  

				if (resItems.length == items.length) {  
					return cb(err, resItems);  
				}  
				else  
					return cb("insert items" + resItems.length, resItems);  
			});  
		});  
	}  
};  

module.exports = bllTest;