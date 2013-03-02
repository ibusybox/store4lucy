//define the product related operation, including the interface between client and server
//this file is used by client and server shared.

/**Global variables start**/
var markdown = require('./markdown');

//the product file location, relative to the web server root path.
var PRODUCT_REPO_PATH = 'products/';
/**Gloabel variables end**/

/**Error code start, product error from [100,200)**/
var ERROR_NO_PRODUCT = 100;
/**Error code end**/


var fs = require('fs');


/**Private function start**/

//get all the product file path
function getAllProductFilePath(rootpath){

}
/**Private function end**/


/*define a supplier*/
function supplier(){
    //the primary key for the supplier object.
    this.supplierName = '';
    //TODO: other property and operation
}

/*
price of product , the price is from one supplier. 
this constructor define the relationship of supplier and price.
*/
function supplierPrice(){
    this.supplierName = '';
    this.price = 0;
}

/*product constructor*/
function createProduct(){
    //the primary key for the product object
    this.productNumber = '';
    this.productModel = '';
    this.productName = '';
    this.productDescription = '';
    this.productImage = [];
    //actually this property can be created dynamicly from the supplier, just reserver, later optimize.
    this.suppliers = [];
}

/**create product summary object**/
function createProductSummary(){
    this.productNumber = '';
    this.productSummaryMD = '';
    this.productSummaryHTML = '';
}

/*create a product object from markdown file*/
function productFromFile(filename){

}

/*create a product object from markdown file*/
function productFromJSON(JSONString){

}

/**
@method Query product info by count. Called by the request handle.
@param [count = int], how many products query, should be greater then 0.
@param [callback = function( statusCode, product[] )]
**/
function queryProductSummaryByCount(count, callback){
    if ( count <= 0 ){
        callback(ERROR_NO_PRODUCT, []);
        return ERROR_NO_PRODUCT;
    }

    //TODO, should read from file
    var productSummary = new createProductSummary();
    productSummary.productNumber = 'IP5-001';
    productSummary.productSummaryMD = '#test md';
    markdown.convertMD2HTML(productSummary.productSummaryMD, function(err, data){
        if ( err ){
            productSummary.productSummaryHTML = "<h3>markdown process error</h3>";
        }else{
            productSummary.productSummaryHTML = data;
        }
        //for reduct the data size, set the md to empty
        productSummary.productSummaryMD = '';
        callback(0, productSummary);
    });

}

/**
product manager facade
**/
function productMgr(){
    this.queryProductSummaryByCount = queryProductSummaryByCount;
}

exports.productMgr = productMgr;

