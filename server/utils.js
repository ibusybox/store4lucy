var KEY_1 = "store4lucy";
var KEY_2 = "password";

var crypto = require('crypto');
var fs = require('fs');

var INDEX_PAGE_PATH = 'server/static/index_sample.html';


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

function getHomePage(callback){
    fs.readFile( INDEX_PAGE_PATH, "utf8", function( err, data ){
        if ( err ){
            //write 505 error to client
            callback(err, null);
        }else{
            callback(null, data);
        }
    } );
}


exports.stringEndWith = stringEndWith;
exports.trim = trim;
exports.encryptSync = encryptSync;
exports.getHomePage = getHomePage;

console.log(encryptSync("fendo"));