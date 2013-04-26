var utils = require('../utils');
var orderFacade = require('../ordermgr/orderfacade');

/**
* Query Order by specify the total count and current count index
*/
function queryOrderByCount(request, response){
    var param = utils.getRequestParam(request);
    
    console.log('order-queryOrderByCount, client send maxcount = ' + param['maxcount'] + ', current = ' + param['current']);
    orderFacade.operationSet['getOrderByCountIndex']( param['maxcount'], param['current'], function( err, order ){
        response.writeHead(200, {'ContentType' : 'text/json'});
        var sendBackData = {error: '', data: ''};
        if ( err ){
            console.log('send error msg to client, err= ' + err);
            sendBackData.error = err;
        }else{
            console.log('send order to client, order = ' + JSON.stringify(order) );
            sendBackData.data = order;
        }
        response.write( JSON.stringify(sendBackData) );
        response.end();
    } );
}

exports.queryOrderByCount = queryOrderByCount;