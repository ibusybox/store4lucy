
var PIMgr = require('./pimgr');

//The operation set export to the facade module
var operationSet = {
    getPIByIndex: getPIByIndex
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

exports.operationSet = operationSet;