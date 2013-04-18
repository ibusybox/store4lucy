var fs = require('fs');

var utils = require('../utils');

var ORDER_REPO = 'home/order/'

/**
* Get order by count index match the file sort index. e.g, if current is 2, then get the second order file
* @param {int} maxcount
* @param {int} current
* @param {function} callback
* @api public
*/
function getOrderByCountIndex( maxcount, current, callback ){
    var index = 0;
    var found = false;

    utils.walkDirectory( ORDER_REPO, {followLinks : false}, 
        function( root, fileStats ){
            if ( ! utils.stringEndWith(fileStats.name, ".json") ){
                //continue find in more files...
                return true;
            }
            if ( index == current && index < maxcount ){
                //found it
                found = true;
                fs.readFile( root + '/' + fileStats.name, 'utf8', function( err, data ){
                    if ( err ){
                        console.log('err in read file, err = ' + err);
                        callback( err, null );
                    }else{
                        console.log('send data back to client:' + data );
                        callback( null, JSON.parse( data ) );
                    }
                } );
                return false;
            }
            index ++;
            return true;
        }, 
        function(){
            //not found
            if ( ! found ){
                callback( 'ordermgr-getOrderByCountIndex, Can not find order by index = ' + current + ', maxcount = ' + maxcount, null );
            }
        } );
}


exports.getOrderByCountIndex = getOrderByCountIndex;
