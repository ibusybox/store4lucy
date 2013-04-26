/**
* The product related operation, exports interface to the Web client.
* In this product facade implementation, each operation should check the permission and do different operation according to the permession.
**/


var utils = require('../utils');
var productFacade = require('../productmgr/productfacade');
var userMgr = require('../auth/usermgr');

/**
* The product main page "/product" call this function
**/
function getProductByIDList(request, response){

    var count = 0;
    var param = utils.getRequestParam(request);
    var idList = param['id_list'].split(',');
    var backProductList = [];
    response.writeHead(200, {'Content-Type' : 'text/json'});
    for( var i = 0; i < idList.length; i++ ){
        productFacade.operationSet['queryProductSummary'](idList.length, idList[i], function(err, product){
            if ( err ){
                console.log('query product by list error = ' + err);
            }else{
                backProductList.push(product);
            }
            //last one then send back to client
            if ( count === ( idList.length - 1 ) ){
                console.log(JSON.stringify( backProductList ));
                response.write( JSON.stringify( backProductList ) );
                response.end();
            }
            count ++;

        });
    }
}

/**
* View detail action call this function
**/
function getProductByID(request, response){

    var param = utils.getRequestParam(request);
    response.writeHead(200, {'Content-Type' : 'text/json'});
    //if user id admin role, send all product info back, else, dont send suppliers back
    userMgr.isAdminRole( request.session.username, function( err, admin ){
        //admin role user
        var operation;
        console.log("username in session = " + request.session.username);
        if ( !err && admin ){
            operation = 'queryProductByID';
        }else{
            //not admin role user
            operation = 'queryProductByIDWithoutSuppliers';            
        }
        console.log("do the operation = " + operation);
        productFacade.operationSet[operation]( param['id'], function( productErr, data ){
            if ( productErr ){
                response.write( productErr );
            }else{
                response.write( JSON.stringify( data ) );
            }
            response.end();
        }); 
    });
}

/**
* Get all categories of product. User can view product by category.
* Response of HTTP Get for /product/q/categories
* @param {HTTPRequest} 
* @param {HTTPResponse}
* @api public
*/
function getAllCategoriesOfProduct(request, response){
    response.writeHead(200, {'Content-Type' : 'text/json'});
    productFacade.queryAllCategoriesOfProduct( function( err, categories ){
        if ( err ){
            response.write(err);
        }else{
            response.write( JSON.stringify(categories) );
        }
        response.end();
    } );
}

/**
* Search all compatible brand of product, return to client as JSON data.
* @param {HTTPRequest}
* @param {HTTPResponse}
* @api public
*/
function getCompatibleBrand(request, response){
    response.writeHead(200, {'Content-Type' : 'text/json'});
    productFacade.operationSet['queryCompatibleBrand']( function( err, brands ){
        if ( err ){
            response.write(err);
        }else{
            console.log('send brands: ' + JSON.stringify(brands) +' to client.' );
            response.write(JSON.stringify(brands));
        }
        response.end();
    } );
}

exports.getProductByIDList = getProductByIDList;
exports.getProductByID = getProductByID;
exports.getAllCategoriesOfProduct = getAllCategoriesOfProduct;
exports.getCompatibleBrand = getCompatibleBrand;
