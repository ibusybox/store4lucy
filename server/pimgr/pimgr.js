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
    var currentIndex = 0;
    var wantMore = true;
    utils.walkDirectory( PI_RESPO_PATH, {followLinks : false}, function( root, fileStats ){
        //ignor non-json files
        if ( ! utils.stringEndWith( fileStats.name, ".json" ) ){
            return wantMore;
        }        
        if ( index === currentIndex ){

            console.log( "pimgr-getPIByIndex, index = " + index + ", currentIndex = " + currentIndex );
            //read json file
            fs.readFile( root + fileStats.name, "utf8", function( err, data ){
                //data is represent the PI stored in File.
                //we need add product_list to the PI before send to client
                console.log("pimgr-getPIByIndex, read pi from file = " + root + "/" + fileStats.name + ", read pi data = " + data );
                var PI = JSON.parse(data);
                var productIdList = PI.product_list;
                var productNum = productIdList.length;
                //counter used in asyn in loop
                var counter = productNum;
                //reset the product_list of PI, store the new Product Json object
                PI.product_list = [];

                //read product by id
                for ( var i = 0; i < productNum; i++ ){
                    productMgr.queryProductByID( productIdList[i], function( productErr, productJson ){
                        if ( productErr ){
                            //just record
                            console.log( "pimgr-getPIByIndex, read product error = " + productErr );
                        }else{
                            PI.product_list.push( productJson );
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
            callback( "Can not found PI by index: " + index, null );
        }
    } );
}

exports.getPIByIndex = getPIByIndex;
