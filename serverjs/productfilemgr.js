/** utils used to read markdown file to product object **/

var fs = require('fs');

var markdown = require('./markdown');

var utils = require('./utils');



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



function readMDFile2ProductSummary(filepath, callback){
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


exports.readMDFile2ProductSummary = readMDFile2ProductSummary;
