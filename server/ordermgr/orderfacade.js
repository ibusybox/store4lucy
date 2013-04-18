
var ordermgr = require('./ordermgr');


var operationSet = {
    getOrderByCountIndex: getOrderByCountIndex
};
function getOrderByCountIndex( maxcount, current, callback ){
    ordermgr.getOrderByCountIndex( maxcount, current, callback );
}


exports.operationSet = operationSet;