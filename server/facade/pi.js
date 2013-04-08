//PI depends Product


var PIFacade = require('../pimgr/pifacade');

/**
* Query one PI by the index of file read order index.
* @param {object} HTTPRequest
* @param {object} HTTPResponse
* @return one PI object, which 'product_id_list' is replaced by the product whole content.
*/
function queryPIByCount(request, response){
    var clientData = '';
    request.setEncoding("utf8");
    request.on( 'data', function( chunk ){
        clientData = clientData + chunk ;
    } );
    request.on( 'end', function(){
        var param = JSON.parse(clientData);
        response.writeHead(200, {'Content-Type' : 'text/json'});
        //everybody can see the PI
        PIFacade.operationSet['getPIByIndex']( param.current, function( err, data ){
            if ( err ){
                console.log("pi-queryPIByCount, get PI by count error = " + err);
                response.write( err );
            }else{
                console.log("pi-queryPIByCount, get PI by count, PI = " + JSON.stringify( data ) );
                response.write( JSON.stringify( data ) );
            }
            response.end();
        } );
    } );
}

/**
* Query one specified product in specified PI.
*/
function queryPIByNO(request, response){
    var clientData = '';
    request.setEncoding("utf8");
    request.on( 'data', function( chunk ){
        clientData = clientData + chunk ;
    } );
    request.on( 'end', function(){
        console.log('read client data = ' + clientData);
        var param = JSON.parse(clientData);
        response.writeHead(200, {'Content-Type' : 'text/json'});
        PIFacade.operationSet['getPIContainsProduct']( param.product_id, param.pi_no, function( err, data ){
            console.log('send data back, err = ' + err + ', data = ' + JSON.stringify(data) );
            if( err ){
                response.write( err );
                response.end();
            }else{
                response.write( JSON.stringify( data ) );
                response.end();
            }
        } );
    } );

}

exports.queryPIByCount = queryPIByCount;
exports.queryPIByNO = queryPIByNO;