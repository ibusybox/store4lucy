var KEY_1 = "store4lucy";
var KEY_2 = "password";

var crypto = require('crypto');


function stringEndWith(src, suffix){
    return src.indexOf(suffix, src.length - suffix.length) !== -1;
}

function trim(s){
    return s.replace(/(^\n*)|(\n*$)/g, "");
}

function encryptSync(src){
    var hmac, result;
    hmac = crypto.createHmac("sha1", src);
    hmac.update(KEY_1);
    hmac.update(KEY_2);
    result = hmac.digest("hex");
    return result;
}

exports.stringEndWith = stringEndWith;
exports.trim = trim;
exports.encryptSync = encryptSync;

console.log(encryptSync("fendo"));