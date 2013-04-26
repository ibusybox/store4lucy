//PI depends Product

var utils = require('../utils');
var PIFacade = require('../pimgr/pifacade');
var productFacade = require('../productmgr/productfacade');

/**
* Query one PI by the index of file read order index.
* @param {object} HTTPRequest
* @param {object} HTTPResponse
* @return one PI object, which 'product_id_list' is replaced by the product whole content.
*/
function queryPIByCount(request, response){
    var param = utils.getRequestParam(request);

    response.writeHead(200, {'Content-Type' : 'text/json'});
    //everybody can see the PI
    PIFacade.operationSet['getPIByIndex']( param['current'], function( err, data ){
        if ( err ){
            console.log("pi-queryPIByCount, get PI by count error = " + err);
            response.write( err );
        }else{
            response.write( JSON.stringify( data ) );
        }
        response.end();
    } );
}

function queryPIDetailByNOWithProductContent(request, response){
    var param = utils.getRequestParam(request);

    var count = 0;
    var product_list = [];

    response.writeHead(200, {'Content-Type' : 'text/json'});
    PIFacade.operationSet['getPIByNO']( param['pi_no'], function( err, PI ){
        if ( err ){
            response.write(err);
        }else{
            var product_id_list = PI.product_id_list;
            for( var i = 0; i < product_id_list.length; i++ ){
                //TODO, should add premission control
                productFacade.operationSet['queryProductByID']( product_id_list[i], function( err, product ){
                    if( err ){
                        console.log('pi-queryPIDetailByNOWithProductContent, query prodct by id error = ' + err);
                    }else{
                        product_list.push(product);
                        //last one then send to client
                        if( count == product_id_list.length - 1 ){
                            PI.product_list = product_list;
                            console.log('send pi to client: ' + JSON.stringify( PI ) );
                            response.write( JSON.stringify( PI ) );
                            response.end();
                        }
                    }

                    count ++;
                } );
            }
        }
    } );
}

exports.queryPIByCount = queryPIByCount;
exports.queryPIDetailByNOWithProductContent = queryPIDetailByNOWithProductContent;