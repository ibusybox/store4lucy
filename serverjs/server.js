var PORT = 80;

var http = require('http');
var url = require('url');
var router = require('./router');
var requestHandles = require('./requesthandles');

//handles
var handles = {};
handles['defaultHandle'] = requestHandles.defaultHandle;
handles['/getProductSummary'] = requestHandles.queryProductSummary;

var server = http.createServer(
    function(request, response){
        var pathname = url.parse(request.url).pathname;
        router.route(request, response, pathname, handles);
});
server.listen(PORT);
console.log("server started on port " + PORT);

