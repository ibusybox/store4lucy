
function route(request, response, pathname, handles){
    //if can not found handle, use the default handle
    if ( typeof handles[pathname] === "function"){
        handles[pathname](request, response);
    }else{
        handles["defaultHandle"](request, response);
    }
}

exports.route = route;