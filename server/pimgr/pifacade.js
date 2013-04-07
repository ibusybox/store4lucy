
var utils = require('../utils');
var PIMgr = require('./pimgr');

//The operation set export to the facade module
var operationSet = {
    getPIByIndex: getPIByIndex,
    getPIContainsProduct: getPIContainsProduct
};

/**
* Get one PI by index, the order is according to the file name sort order.
* @param {int} index
* @param {function} callback
* @return {Object} json object of PI
* @api public 
*/
function getPIByIndex( index, callback ){
    PIMgr.getPIByIndex( index, callback );
}

/**
* Get one specified PI contains one specified Prdocut, both are specified by ID.
* @param {int} product id
* @param {string} PI Number
* @param {function} callback
* @api public
*/
function getPIContainsProduct( productId, PI_NO, callback ){
    PIMgr.getPIByPINO( PI_NO, function(err, data){
        if ( err ){
            callback( err, null );
        }else{
            //TODO, filter product_id_list and product_list by productId

            //product_id_list is replaced from id array to product array
            data.product_id_list = utils.deleteIf( data.product_id_list, function( product ){ 
                return productId === product.feature.number; 
            } );
            data.product_list = utils.deleteIf( data.product_list, function( purchase ){ 
                return purchase.product_id === productId;
            } );
            callback( null, data );
        }
    } );
}

exports.operationSet = operationSet;