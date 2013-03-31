/**
* product facade, this file exports interface to the facade module.
* facade module is used to display content variant according to the user permission.
**/

//define all request handles
var fs = require('fs');
var url = require('url');
var path = require('path');

var utils = require('../utils');
var ProductMgr = require('./productmgr');
var productMgr = new ProductMgr.productMgr();

//exports operation set
var operationSet = {
    queryProductSummary: queryProductSummary, 
    queryProductByID: queryProductByID, 
    queryProductByIDWithoutSuppliers: queryProductByIDWithoutSuppliers
};


//functions end

//request handles start


/*
* The interface between client and server, used to query product info.
* 
*/
function queryProductSummary(maxcount, current, callback){
    productMgr.queryProductSummaryByCount(maxcount, current, function( err, data ){
        if ( err ){
            callback( err, null );
        }else{
            //get product summary dont send suppliers info
            var product = data;
            product.suppliers = [];
            callback ( null, product );
        }
    });
}

/**
* Query product by ID, return all info of one product.
**/
function queryProductByID(id, callback){
    productMgr.queryProductByID(id, callback);
}

/**
* Query product by ID, without suppliers Info
**/
function queryProductByIDWithoutSuppliers(id, callback){
    productMgr.queryProductByID( id, function( err, product ){
        if ( err ){
            callback( err, null );
        }else{
            product.suppliers = [];
            console.log("productfacade, queryProductByIDWithoutSuppliers, product = " + product);
            callback( null, product );
        }
    } );
}

//request handles end

exports.operationSet = operationSet;

