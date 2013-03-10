//define all request handles
var fs = require('fs');
var url = require('url');
var path = require('path');

var mime = require('./mime');
var ProductMgr = require('./productmgr');
var productMgr = new ProductMgr.productMgr();


//functions
function getMIMEType(mime, path, realpath){
    var ext = path.extname(realpath);
    ext = ext ? ext.slice(1) : 'unknown';
    var contentType = "text/plain";
    if (ext !== 'unknown'){
        contentType = mime.MIMETypes[ext];
    }

    return contentType;
}

function forbiddenAccess(response){
    response.writeHead(404, {'Content-Type' : 'text/plain'});
    response.write("Forbidden Access");
    response.end();

}
//functions end

//request handles start

/**the default handle, represent as a static web server*/
function defaultHandle(request, response){
        var pathname = url.parse(request.url).pathname;
        //remove the first slash /
        var realpath = pathname.slice(1, pathname.length);
        console.log("realpath = " + realpath);
        var exists = fs.existsSync(realpath);

        //if path not exist, forbidden access
            if (!exists){
                forbiddenAccess(response);
            }else {
                //if path is not file, forbidden access
                var stat = fs.statSync(realpath);
                if ( !stat.isFile() ){
                    forbiddenAccess(response);
                }
                else {

                console.log("read file : " + realpath);
                fs.readFile(realpath, "binary", function(err, file){
                    if (err){
                        response.writeHead(505, {'Content-Type' : 'text/plain'});
                        response.end("Internal Error");
                    }else{
                        response.writeHead(200, {'Content-Type' : getMIMEType(mime, path, realpath)});
                        response.write(file, "binary");
                        response.end();
                    }
                });

                }

            }
}

/*
The interface between client and server, used to query product info.
See the interface document for the detail of this interface.
*/
function queryProductSummary(request, response){
    //read the data from client
    var clientData = '';
    request.setEncoding("utf8");
    request.on("data", function(chuck){
        clientData = clientData + chuck;
    });

    request.on("end", function(){
        console.log("data " + clientData);
        var param = JSON.parse(clientData);
        console.log("data json parsed: " + param);

        response.writeHead(200, {'Content-Type' : 'text/json'});

        //TODO, 50 should pass from client
        productMgr.queryProductSummaryByCount(param.maxcount, param.current, function(err, products){
            if ( ! err ){
                var product_json = JSON.stringify(products);
                console.log("send product json: " + product_json);
                response.write(product_json);
            }else{
                response.write("query product failed, error = " + err);
            }
            response.end();
            console.log("process queryProduct");
        });

    });


}

function queryProductDetailByID(request, response){
    var id = url.parse(request.url).query.id;
    
}

//request handles end

exports.defaultHandle = defaultHandle;
exports.queryProductSummary = queryProductSummary;

