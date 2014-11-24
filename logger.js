var log4js = require('log4js');
log4js.configure({
  appenders: [
	{ type: 'console' }, //控制台输出
	{
	  type: 'file', //文件输出
	  filename: './logs/access.log', 
	  maxLogSize: 1024,
	  backups:3 
	}
  ],
  replaceConsole: true
});

log4js.logger = function(name){
  var logger = log4js.getLogger(name);
  logger.setLevel('INFO');
  return logger;
}

module.exports= log4js;