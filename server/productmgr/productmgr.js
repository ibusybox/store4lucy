//define the product related operation, including the interface between client and server
//this file is used by client and server shared.

/**Global variables start**/


var productFileMgr = require('./productfilemgr');

var utils = require('../utils');

//the product file location, relative to the web server root path.
var PRODUCT_REPO_PATH = 'home/products/';
/**Gloabel variables end**/

/**Error code start, product error from [100,200)**/
var ERROR_NO_PRODUCT = 100;
/**Error code end**/

Array.prototype.contains = utils.arrayContainsPrototype;

function getAllCompatibleBrand( callback ){
    var brand = {brands: []};

    utils.forEachProduct( PRODUCT_REPO_PATH, {followLinks : false}, 
    function( err, product ){
        if ( err ){
            console.log('productmgr-getAllCompatibleBrand, read product error = ' + err );
        }else{
            if ( ! brand.brands.contains( product.feature.compatible_brand ) ){
                brand.brands.push(product.feature.compatible_brand);
            }
        }
   }, 
    function(){
        callback( null, brand.brands );
    } ); 
}
/**
* Walk through the product repository and find the product categories.
* Categories contains properties of product are: model, material, price.
* @param {function} callback
* @api public
*/
function getAllCategoriesOfProduct( callback ){
    var categories;
    var product;
    utils.walkDirectory( PRODUCT_REPO_PATH, {followLinks : false},
        function( root, fileStats ){
            //json file is treated as product
            if ( utils.stringEndWith(fileStats.name, ".json") ){
                fs.readFile( root + '/' + fileStats.name, 'utf8', function( err, data ){
                    if ( err ){
                        console.log('productmgr-getAllCategoriesOfProduct, read file ' + fileStats.name + ' failed, err = ' + err);
                    }else{
                        product = JSON.parse(data);
                        //save product materil, model, price
                        if ( ! categories.models ){
                            categories.models = [];
                        }
                        if ( ! categories.models.contains(product.model) ){
                            categories.models.push(product.model);
                        }
                        if ( ! categories.price ){
                            categories.price = [];
                        }
                        categories.price.push(product.price);
                        if ( ! categories.materials ){
                            categories.materials = [];
                        }
                        if ( ! categories.materials.contains(product.model) ){
                            categories.materials.push(product.model);
                        }

                    }
                } );   
            }
        },
        function(){
            callback( null, categories);
        } );
}

function readProductSummaryByID(count, current, callback){
    var index = 0;
    var product;
    var wantMore = true;
    utils.walkDirectory( PRODUCT_REPO_PATH, 
        {followLinks : false}, 
        function( root, fileStats ){
            if ( utils.stringEndWith(fileStats.name, ".json") ){
                if ( fileStats.name == current + ".json" ){
                    console.log("process file = " + fileStats.name);
                    productFileMgr.readMDFile2ProductSummary( root + "/" + fileStats.name, callback );
                    wantMore = false;
                }
            }
            return wantMore;
    }, 
    function(){
        //not found
        if ( wantMore ){
            callback( "Requested product " + current + " not found.", null );
        }
    } );


}

function readProductByID(id, callback){
    var wantMore = true;
    utils.walkDirectory( PRODUCT_REPO_PATH, {followLinks : false}, 
        function(root, fileStats){
            if ( utils.stringEndWith(fileStats.name, ".json") ){
                if ( fileStats.name == id + ".json" ){
                    productFileMgr.readMDFile2Product( root + "/" + fileStats.name, callback );
                    wantMore = false;
                }
            }
            return wantMore;
        },  
        function(){
            //not found the product
            if ( wantMore ){
                callback("Can not found product by id " + id, null);
            }
        } );
}


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
    this.getAllCategoriesOfProduct = getAllCategoriesOfProduct;
    this.getAllCompatibleBrand = getAllCompatibleBrand;
}

exports.productMgr = productMgr;

