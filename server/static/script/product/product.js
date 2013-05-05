
var QUERY_ALL_BRAND_OF_PRODUC = '/product/q/compatible_brand';

var QUERY_PRODUCT_BATCH_COUNT = 20;


/**
* handle for product home page, URL: /product
* /product url will be redirected to query product by list url.
* @api public, called by index page
**/
function handleGetProductHoemPage(){
    var count = 0;
    var idList = '';
    for( var i = 0; i < QUERY_PRODUCT_BATCH_COUNT; i++ ){
        //first one
        if ( i === 0 ){
            idList = i;
        }else{
            idList = idList + ',' + i;        
        }
    }

    window.location.replace(URL_QUERY_PRODUCT_LIST_HTML + '/?id_list=' + idList);

}

/**
* handle the Get request of URL: /product/q/id_list/?id_list=1,2,3...
* @api public, called by the index page
*/
function handleGetProductListHTML(){
    //call function from utils.js
    var idList = getURLParameter('id_list');
    var product, count, html;
    count = 0;
    $.get(URL_QUERY_PRODUCT_LIST_JSON + '/?id_list=' + idList, function(productList){
        for( var i = 0; i < productList.length; i++ ){
            product = productList[i];
            html = spanProduct( product.feature.number, convertJSON2ProductSummary(product) );
            if (count % 4 === 0){
                    //$("<div class=\"row-fluid\"></div><hr>").insertBefore("footer");
                    $("#contentContainer").append("<div class=\"row-fluid\"></div><hr>");
            }
            $("div.row-fluid:last").append(html);

            count ++;
        }
    }, 'json' );

}

/**
* query product by ID, view all info of product.
* @api public, called by index page
**/
function handleGetProductByIDHTML(){
    var productId = getURLParameter('id');
    queryProductByID( productId, function( product ){
            $("#contentContainer").empty();
            //insert product html framework to dom
            var html = formatProductHtmlFrame(product);
            $("#contentContainer").append( html );

            //insert product image to dom
            html = formatProductImageHtml( product );
            $("#contentContainer #images").append(html);

            //insert product description to dom
            html = formatProductDescHtml( product );
            $("#contentContainer #feature").append(html);
        
    } );
}



/**
* Query one product detail by product ID.
* @param {int} productId
* @param {function} callback
* @api private
*/
function queryProductByID(productId, callback){
    $.get(URL_QUERY_PRODUCT_JSON + '/?id=' + productId, function(product){
        callback( product );
    }, 'json');

}

/**
* Query all brands of all products.
* @param {function} callback
* @api private
*/
function queryAllBrandOfProduct( callback ){
    $.get( QUERY_ALL_BRAND_OF_PRODUC, function( brands ){
        callback( brands );
    }, 'json' );
}

/**
* Warp one brand to hero-unit html block
* @api private
*/
function wrapBrand2HeroUnit(oneBrand){
    var brand = {brand: oneBrand};
    var html = new EJS({url : "/script/product/product_brand.ejs"}).render(brand);
    return html;
}

/**
* Render EJS with data.
* @api private
*/
function formatProductHtmlFrame(data){
    var html = new EJS({url : "/script/product/product.ejs"}).render(data);
    return html;
}
/**
* Render EJS with data.
* @api private
*/
function formatProductImageHtml( data ){
    var html = new EJS({url : "/script/product/product_image.ejs"}).render(data);
    return html;
}
/**
* Render EJS with data.
* @api private
*/
function formatProductDescHtml( data ){
    var html = new EJS({url : "/script/product/product_desc.ejs"}).render(data);
    return html;
}

/**
* Format product HTML with span3, and add 'Detail' button.
* @param {string} 'Detail' button group ID (actually the button group is no need, button is ok)
* @param {string} HTML string who is inserted to the span3 div
* @api public Called by the pi.js when display product in PI.
*/
function spanProduct(productId, html){
    //add the detail button first
    var retHtml = '<div class="span3">' + html;
    //detail link
    retHtml = retHtml + '<a href="' + URL_QUERY_PRODUCT_HTML + '/?id=' + productId + '">Detail</a>';

    return retHtml + '</div>';
}

/**
* Format product summary html string by product json data.
* @param {Object} JSON obect of product.
* @api public Called by the pi.js when display product in PI.
*/
function convertJSON2ProductSummary(product){
    var html = '';

    //use the first image data as thumbnail image
    html = html + '<image src="/' + product.images[0].imagesrc + '"/>';
    html = html + "<p>" + product.feature.description + "</p>";
    return html;
}
