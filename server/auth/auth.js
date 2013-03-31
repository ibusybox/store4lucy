/**The login page **/
var queryString = require('querystring');

var usermgr = require('./usermgr');
var utils = require('../utils');

/**private methods**/
function isAuth(request, response, username){
    return (typeof request.session != "undefined" ) && (request.session.username == username) ;
}
function auth(username, password, callback){
    usermgr.findUserByName(username, function(err, user){
        if ( err ){
            callback(err, null);
        }else{
            //login succeed
            if ( user.password == utils.encryptSync(password) ){
                callback( null, user );
            }else{
                callback("user name or password is wrong.", null);
            }

        }
    });
}
/**private methods end**/


function login(request, response){
    var loginData = '';

    request.setEncoding("utf8");
    request.on("data", function(data){
        loginData += data;
    });

    request.on("end", function(){
        //valid use name and password
        var userInfo = queryString.parse(loginData);

        var loginResult = {statusCode: 0, err: ''};

        //if already auth then redirect
        if ( isAuth( request, response, userInfo.username)){
            console.log("user " + userInfo.username + " already auth ")
            response.redirect('/product'); 
        }else{
            //else auth it
            auth(userInfo.username, userInfo.password, function( err, user ){
                response.writeHead( 200, {'Content-Type' : 'text/json'} );
                if ( err ){
                    loginResult.statusCode = 1;
                    loginResult.err = err;
                    response.write(JSON.stringify(loginResult));
                    response.end();
                }else{
                    loginResult.statusCode = 0;
                    //only express.use(express.session()) support this.
                    //request.session.regenerate( function(){
                        request.session.username = userInfo.username;
                        console.log("set session username = " + request.session.username);
                        response.write(JSON.stringify(loginResult));
                        response.end();
                    //} );
                }
                
            });
        }
        
        
    });

}


exports.login = login;