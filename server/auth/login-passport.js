/**The login page **/
var queryString = require('querystring');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var usermgr = require('usermgr');
var utils = require('../utils');

/**private methods**/
passport.serializeUser(function (user, done){
    usermgr.updateUser(user, function(err, user){
        done(err, user);
    });
    
});
passport.deserializeUser(function (name, done){
    usermgr.findUserByName(name, function(err, user){
        done(err, user);
    });
    
});

passport.use( new LocalStrategy(
    function (username, password, done){
        process.nextTick(function (){
            usermgr.findUserByName(username, function(err, user){
                if ( err ){return done(err);}
                if ( !user ){return done(null, false, {message: "Unknown user " + username});}
                //user password from client is not encrypted
                if ( utils.encryptSync( password ) != user.password ){return done(null, false, {message: "Invalid password"});}
                return done(null, user);
            });
        });
    }
    ));

/**private methods end**/


function postLogin(request, response){
    var loginData = '';
    request.on("data", function(data){
        loginData += data;
    });

    request.on("end", function(){
        //valid use name and password

    });

}

exports.postLogin = postLogin;