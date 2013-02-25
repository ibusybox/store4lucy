//define the product related operation, including the interface between client and server
//this file is used by client and server shared.

/**Global variables start**/
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
function queryProductByCount(count, callback){
    if ( count <= 0 ){
        callback(ERROR_NO_PRODUCT, []);
        return ERROR_NO_PRODUCT;
    }

    //TODO, should read from file
    var product = new createProduct();
    product.productNumber = 'IP1-CS-001';
    product.productModel = 'iPhone5';
    product.productName = 'iPhone5 metal case';
    product.productDescription = 'iPhone5 metal case best selling.';
    product.productImage = [];
    product.suppliers[0] = new supplierPrice();
    product.suppliers[0].supplierName='Chuangjida';
    product.suppliers[0].price = '6 RMB';

    var products = [];
    products[0] = product;

    callback(0, products);
}

/**
product manager facade
**/
function productMgr(){
    this.queryProductByCount = queryProductByCount;
}

exports.productMgr = productMgr;

