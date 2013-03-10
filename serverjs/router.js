
var APP_NAMES = ["/product", "/order", "/pi", "/supplier"];


function forwardIndxePage(request, response, pathname){
    var i = 0;
    var isIndex = false;
    console.log("start forward path " + pathname);
    for (; i < APP_NAMES.length; i++){
        if ( pathname == APP_NAMES[i]){
            console.log(pathname + " == " + APP_NAMES[i])
            isIndex = true;
        }
    }

    if ( isIndex ){
        response.writeHead(302, {'Location' : pathname + '/index.html'});
        response.end();
    }
    return isIndex;
}

function route(request, response, pathname, handles){
    //check if the home page and forward if it is?
    var forwarded = forwardIndxePage(request, response, pathname);
    if ( forwarded ){
        return;
    }

    //if can not found handle, use the default handle
    if ( typeof handles[pathname] === "function"){
        handles[pathname](request, response);
    }else{
        handles["defaultHandle"](request, response);
    }
}



exports.route = route;