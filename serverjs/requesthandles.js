//define all request handles
var fs = require('fs');
var url = require('url');
var path = require('path');
var mime = require('./mime');

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

//the default handle, represent as a static web server
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

function queryProduct(request, response){
    response.writeHead(200, {'Content-Type' : 'text/plain'});
    response.write("This is empty queryproduct result.");
    response.end();
    console.log("process queryProduct");
}

//request handles end

exports.defaultHandle = defaultHandle;
exports.queryProduct = queryProduct;

