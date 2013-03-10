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


function readProductSummaryByID(count, current, callback){
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
        if ( utils.stringEndWith(fileStats.name, ".json") ){
            if ( fileStats.name == current + ".json" ){
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

function readProductByID(id, callback){
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
        if ( utils.stringEndWith(fileStats.name, ".json") ){
            if ( fileStats.name == id + ".json" ){
                //call productFileMgr
                productFileMgr.readMDFile2Product( root + "/" + fileStats.name, callback );
            }
        }else{
            next();
        }
    });
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
    }else{
        //read count files
        readProductSummaryByID(count, current, callback);

    }

}

/***
* @method Query product by ID. Called by the request handle.
* @param [id = int], the id of the product.
* @param [callback = function(err, data)]
**/
function queryProductByID(id, callback){
    readProductByID(id, callback);
}


/**
product manager facade
**/
function productMgr(){
    this.queryProductSummaryByCount = queryProductSummaryByCount;
    this.queryProductByID = queryProductByID;
}

exports.productMgr = productMgr;

