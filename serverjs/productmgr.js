//define the product related operation, including the interface between client and server
//this file is used by client and server shared.

/**Global variables start**/

var walk = require('./walk');

var productFileMgr = require('./productfilemgr');

var utils = require('./utils');

//the product file location, relative to the web server root path.
var PRODUCT_REPO_PATH = 'home/products/';
/**Gloabel variables end**/

/**Error code start, product error from [100,200)**/
var ERROR_NO_PRODUCT = 100;
/**Error code end**/


/**Private function start**/

//get all the product file path
function getAllProductFilePath(rootpath){

}
/**Private function end**/



/**
@method Query product info by count. Called by the request handle.
@param [count = int], how many products query, should be greater then 0.
@param [callback = function( statusCode, product[] )]
**/
function queryProductSummaryByCount(count, current, callback){
    if ( count <= 0 ){
        callback("error count number, count = " + count, []);
        return;
    }

    //read count files
    readProductByID(count, current, callback);

}

function readProductByID(count, current, callback){
    var index = 0;
    var product;

    var walker = walk.walk(PRODUCT_REPO_PATH, {followLinks : false});

    walker.on("directories", function (root, dirStatsArray, next){
        next();
    });
    walker.on("errors", function (root, nodeStatsArray, next){
        next();
    });
    walker.on("end", function (){
        console.log("end read products.");
    });
    walker.on("file", function (root, fileStats, next){
        if ( utils.stringEndWith(fileStats.name, ".md") ){
            if ( fileStats.name == current + ".md" ){
                console.log("process file = " + fileStats.name);
                productFileMgr.readMDFile2ProductSummary( root + "/" + fileStats.name, callback );
            }
        }
        if (index <= count){
            next();
        }
        index ++;
    });

}


/**
product manager facade
**/
function productMgr(){
    this.queryProductSummaryByCount = queryProductSummaryByCount;
}

exports.productMgr = productMgr;

