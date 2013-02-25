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
//functions end

//request handles start

/**the default handle, represent as a static web server*/
function defaultHandle(request, response){
        var pathname = url.parse(request.url).pathname;
        //remove the first slash /
        var realpath = pathname.slice(1, pathname.length);
        console.log("request path = " + realpath);
        var exists = fs.existsSync(realpath);
            if (!exists){
                response.writeHead(404, {'Content-Type' : 'text/plain'});
                response.write("Forbidden Access");
                response.end();
            }else{
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

/*
The interface between client and server, used to query product info.
See the interface document for the detail of this interface.
*/
function queryProduct(request, response){
    response.writeHead(200, {'Content-Type' : 'text/json'});

    //TODO, 50 should pass from client
    productMgr.queryProductByCount(50, function(statusCode, products){
        if ( statusCode === 0 ){
            var i = 0;
            var product_json = JSON.stringify(products[i]);
            console.log("send product json: " + product_json);
            for (; i < products.length; i++){
                response.write(product_json);
            }
        }else{
            response.write("query product failed, error = " + statusCode);
        }
    });
    response.end();
    console.log("process queryProduct");
}

//request handles end

exports.defaultHandle = defaultHandle;
exports.queryProduct = queryProduct;

