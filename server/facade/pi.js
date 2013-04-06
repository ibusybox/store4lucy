//PI depends Product


var PIFacade = require('../pimgr/pifacade');

function queryPIByCount(request, response){
    console.log("come into queryPIByCount in pi.js");
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

exports.queryPIByCount = queryPIByCount;