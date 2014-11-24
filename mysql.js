var mysql      = require('mysql');
 
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  port 	   : '3306',
  database  : 'odd'
});

connection.connect(function(err) {
  if (err) {
	console.error('error connecting: ' + err.stack);
	return;
  }

  console.log('connected as id ' + connection.threadId);
});


connection.query('SELECT * from t_advertisement', function(err, data, fields) {
  if (err) throw err;
  for(var index in data){
	  console.log('data ' +index +'==='+ JSON.stringify(data[index]));
  }
  
});

connection.end();