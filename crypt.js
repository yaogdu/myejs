var crypto = require('crypto');

crypto.crypt = function (originalStr){
    var sha1 = crypto.createHash('sha1');
    sha1.update(originalStr+'123456');
    return sha1.digest('hex');

};

module.exports = crypto;


