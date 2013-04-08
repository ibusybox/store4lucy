var fs = require('fs');

var PI_RESPO_PATH = "home/pi/";

var utils = require('../utils');
var ProductMgr = require('../productmgr/productmgr');
var productMgr = new ProductMgr.productMgr();

/**
* Get PI from repository. 
* This function will fill the product JSON into the PI object, instead of the product id.
* @param {int} index
* @param {callback} error and PI object as parameter
* @api public
*/
function getPIByIndex( index, callback ){
    getPIByCondition( function(fileIndex, PIFileName){
        //PIFileName is the PI number
        return index === fileIndex;
    }, callback );
}

/**
* Get PI object By PI NO
* @param {string} PINO
* @param {function} callback
* @api public
*/
function getPIByPINO( PINO, callback ){
    getPIByCondition( function(fileIndex, PIFileName){
        console.log('pimgr-getPIByPINO, fileIndex = ' + fileIndex + ', PIFileName = ' + PIFileName + ', PINO = ' + PINO);
        return (PINO + '.json').toUpperCase() === PIFileName.toUpperCase();
    }, callback );
}

/**
* Get PI object by specified condition.
* @api private
*/
function getPIByCondition(cond, callback){
    var currentIndex = 0;
    var wantMore = true;
    utils.walkDirectory( PI_RESPO_PATH, {followLinks : false}, function( root, fileStats ){
        //ignor non-json files
        if ( ! utils.stringEndWith( fileStats.name, ".json" ) ){
            return wantMore;
        }        
        //PI file name is the PI number
        if ( cond( currentIndex, fileStats.name ) ){

            //console.log( "pimgr-getPIByIndex, index = " + index + ", currentIndex = " + currentIndex );
            //read json file
            fs.readFile( root + fileStats.name, "utf8", function( err, data ){
                //data is represent the PI stored in File.
                //we need add product_list to the PI before send to client
                console.log("pimgr-getPIByCond, read pi from file = " + root + "/" + fileStats.name  );
                var PI = JSON.parse(data);
                var productIdList = PI.product_id_list;
                var productNum = productIdList.length;
                //counter used in asyn in loop
                var counter = productNum;
                //reset the product_list of PI, store the new Product Json object
                PI.product_id_list = [];

                //read product by id
                for ( var i = 0; i < productNum; i++ ){
                    productMgr.queryProductByID( productIdList[i], function( productErr, productJson ){
                        if ( productErr ){
                            //just record
                            console.log( "pimgr-getPIByCond, read product error = " + productErr );
                        }else{
                            PI.product_id_list.push( productJson );
                        }
                        counter--;

                        //callback when last product read
                        if ( counter === 0 ){
                            callback( null, PI );
                        }
                    } );
                }
            });
            wantMore = false;
        }
        currentIndex++;
        return wantMore;
    }, function(){
        if ( wantMore ){
            callback( "Can not found PI by condition: " + cond , null );
        }
    } );
}

exports.getPIByIndex = getPIByIndex;
exports.getPIByPINO = getPIByPINO;
