var orm = require('orm');  
var db = orm.connect("mysql://root:root@localhost/odd");

var bllTest = {
	getItem: function (id, cb) {
		db.load('./models/goods', function (err) {
			if (err) {
				return cb(err, null);
			}
			db.models.t_goods.find({"id": id}, 1, function (err, goods) {
				cb(err, goods);
			});
		});
	},
	getItems: function (cb) {
		db.load('./models/goods', function (err) {
			if (err) {
				return cb(err, null);
			}
			db.models.t_goods.find(function (err, goods) {

				cb(err, goods);
			});
		});
	},
	insertItems: function (items, cb) {
		db.load('./models/goods', function (err) {
			if (err)
				return  cb(err, null);

			db.models.t_goods.create(items, function (err, resItems) {
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