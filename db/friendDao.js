var orm = require('orm');  
var db = orm.connect("mysql://root:root@localhost/odd");  

var bllTest = {  
	getItem: function (id, cb) {  
		db.load('./models/friend', function (err) {  
			if (err) {  
				return cb(err, null);  
			} 
			db.models.t_friend.find({"id": id}, 1, function (err, user) { 
				cb(err, user);  
			});  
		});  
	}, 
	getItems: function (cb) {  
		db.load('./models/friend', function (err) {  
			if (err) {  
				return cb(err, null);  
			} 
			db.models.t_friend.find(function (err, ads) { 
				cb(err, users);  
			});  
		});  
	},  
	insertItems: function (items, cb) { 
		db.load('./models/friend', function (err) {  
			if (err)  
				return  cb(err, null);  

			db.models.t_friend.create(items, function (err, resItems) {  
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