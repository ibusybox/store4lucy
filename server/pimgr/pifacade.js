
var utils = require('../utils');
var PIMgr = require('./pimgr');

//The operation set export to the facade module
var operationSet = {
    getPIByIndex: getPIByIndex,
    getPIByNO: getPIByNO
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
function getPIByNO( PI_NO, callback ){
    PIMgr.getPIByPINO( PI_NO, function(err, data){
        if ( err ){
            callback( err, null );
        }else{
            //filter product_id_list and product_list by productId

            //product_id_list is replaced from id array to product array
            callback( null, data );
        }
    } );
}

exports.operationSet = operationSet;