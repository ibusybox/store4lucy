//define the product related operation, including the interface between client and server
//this file is used by client and server shared.

/**Global variables start**/
var fs = require('fs');

var markdown = require('./markdown');

var walk = require('./walk');

var utils = require('./utils');

//the product file location, relative to the web server root path.
var PRODUCT_REPO_PATH = 'home/products/';
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
    this.product = {
        productNumber : "",
        productName : "",
        productThumbnail : "",
        productModel : "",
        productColor : "",
        productDescription : "",
        productMaterial : "",
        productImage : [],
        //actually this property can be created dynamicly from the supplier, just reserver, later optimize.
        suppliers : []
    };
}

/**create product summary object**/
function createProductSummary(){
    this.productNumber = '';
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
        callback("error count number, count = " + count, []);
        return;
    }

    //read count files
    readProductFromFSBatch(count, callback);

}

function readProductFromFSBatch(count, callback){
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
            console.log("process file = " + fileStats.name);
            readProductFromFSSingle(root + "/" + fileStats.name, callback);
        }
        if (index <= count){
            next();
        }
        index ++;
    });

}

/**
* read one product object from markdown file
**/
function readProductFromFSSingle(filepath, callback){
    var product = new createProduct().product;
    var i = 0;
    var numberStartIndex, nameStartIndex, thumbnailStartIndex, modelIndex;
    //the number, name, thumbnail attribute is located in the before 10 lines
    var readableStream = fs.createReadStream(filepath, {start : 0, end : 200});
    readableStream.setEncoding('utf8');
    readableStream.on("data", function(data){
        //TODO should extract common function
        console.log("debug: read data = " + data);
        thumbnailStartIndex = data.indexOf("###thumbnail");
        numberStartIndex = data.indexOf("###number");
        nameStartIndex = data.indexOf("###name");
        modelIndex = data.indexOf("###model");

        product.productThumbnail = getValueFromMDSection( data.slice(0, numberStartIndex - 1) );
        product.productNumber = getValueFromMDSection( data.slice(numberStartIndex - 1, nameStartIndex - 1) );
        product.productName = getValueFromMDSection( data.slice(nameStartIndex - 1, modelIndex - 1) );
        console.log("debug: product.productThumbnail = " + product.productThumbnail + ", product.productNumber = " + product.productNumber + ", product.productName = " + product.productName);

        var productSummary = new createProductSummary();
        productSummary.productNumber = product.productNumber;
        productSummary.productSummaryHTML = markdown.convertMD2HTML(product.productThumbnail + product.productName);
        callback(null, productSummary);
    });
    readableStream.on("error", function(){
        var err = "read product from markdown file " + filepath + " failed.";
        callback(err, null);
        console.log(err);
    });
}

/**
* the the value from markdown section
* - mdSection, String, like ####name \n iPhone5 meta case
* return, the value 
**/
function getValueFromMDSection(mdSection){
    //delete the first and last \n 
    var section = trim(mdSection);
    console.log("get section value = " + section);
    return section.slice(section.indexOf("\n"), section.length);

}

function trim(s){
    return s.replace(/(^\\n*)|(\\n*$)/g, "");
}


/**
product manager facade
**/
function productMgr(){
    this.queryProductSummaryByCount = queryProductSummaryByCount;
}

exports.productMgr = productMgr;

