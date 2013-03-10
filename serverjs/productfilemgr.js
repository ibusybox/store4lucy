/** utils used to read markdown file to product object **/

var fs = require('fs');

var utils = require('./utils');


/**Private method start**/

/**Private method end**/


/**Plubic method start**/

/***
* @method read the product markdown file and tranlsate to html format.
* @param [filepath = string], the path of the markdown file.
* @param [callback = function(err, data)], callback function when finish.
**/
function readMDFile2Product(filepath, callback){
    readMDFile2ProductSummary(filepath, callback);
}

/***
* @method read the product markdown file and tranlsate to product summary html format.
* @param [filepath = string], the path of the markdown file.
* @param [callback = function(err, data)], callback function when finish.
**/

function readMDFile2ProductSummary(filepath, callback){
    fs.readFile(filepath, "utf8", function(err, data){
        if ( err ){
            callback( err, null );
        }else{
            callback( null, data );
        }
    });
}


exports.readMDFile2ProductSummary = readMDFile2ProductSummary;
exports.readMDFile2Product = readMDFile2Product;
