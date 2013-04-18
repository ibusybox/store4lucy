
var QUERY_PRODUCT_SUMMARY_URL = '/getProductSummary';

var SEARCH_PRODUCT_URL = '/product/q';

var QUERY_ALL_BRAND_OF_PRODUC = '/product/q/compatible_brand';

var QUERY_PRODUCT_BATCH_COUNT = 20;


/**
* Query product by count, called by the index.html page, when loading page.
* @api public, called by index page
**/
function queryProductByCount(){
    var i = 0;

    var count = 0;

    for( ; i < QUERY_PRODUCT_BATCH_COUNT; i++ ){
        $.post(QUERY_PRODUCT_SUMMARY_URL, JSON.stringify({"maxcount" : QUERY_PRODUCT_BATCH_COUNT, "current" : i + 1}), function(data, textStatus){
            var html = '';
            if ( textStatus == "success" ){
                var btnGrpId = 'btnGrp_' + data.feature.number;
                //data is one createProductSummary object
                html = spanProduct( btnGrpId, convertJSON2ProductSummary(data) );
                
                //each row 4 columns
                if (count % 4 === 0){
                    //$("<div class=\"row-fluid\"></div><hr>").insertBefore("footer");
                    $("#contentContainer").append("<div class=\"row-fluid\"></div><hr>");
                }
                $("div.row-fluid:last").append(html);    
                bindProductDetailBtnEvents(data.feature.number, btnGrpId, getProductDetail);
            }else{
                html = spanProduct( 0, "<h3>jQuery process error.</h3>" );

            }
            count ++;
    }, 'json');

    }

}

/**
* Detail button onclick action. 
* Popup a dialog to show the detai info.
* @api private
**/
function getProductDetail(productId, btnGrpId){
    queryProductByID( productId, function( err, data ){
        if ( err ){
            alert('Get product detail error.');
        }else{
            $("#contentContainer").empty();
            //insert product html framework to dom
            var html = formatProductHtmlFrame(data);
            $("#contentContainer").append(html);

            //insert product image to dom
            html = formatProductImageHtml( data );
            $("#contentContainer #images").append(html);

            //insert product description to dom
            html = formatProductDescHtml( data );
            $("#contentContainer #feature").append(html);
        }
    } );
}

/**
* Query one product detail by product ID.
* @param {int} productId
* @param {function} callback
* @api private
*/
function queryProductByID(productId, callback){
    $.post(SEARCH_PRODUCT_URL, JSON.stringify({"id" : productId}), function(data, textStatus){ 
        if ( textStatus == "success" ){
            callback( null, data );
        }else{
            callback( textStatus, null );
        }
                     
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
* Product homepage is list all compatible brands of mobile phone
* @api public
*/
function setupProductHomePage(){
    var html = '';
    queryAllBrandOfProduct( function( brands ){
        for ( var i = 0; i < brands.length; i++ ){
            //wrap each brand to hero-unit block
            html = wrapBrand2HeroUnit(brands[i]);
            console.log(html);
            $('#contentContainer').append(html);
        }
    } );
}

/**
* Warp one brand to hero-unit html block
* @api private
*/
function wrapBrand2HeroUnit(oneBrand){
    var brand = {brand: oneBrand};
    var html = new EJS({url : "/script/product_brand.ejs"}).render(brand);
    return html;
}

/**
* Render EJS with data.
* @api private
*/
function formatProductHtmlFrame(data){
    var html = new EJS({url : "/script/product.ejs"}).render(data);
    return html;
}
/**
* Render EJS with data.
* @api private
*/
function formatProductImageHtml( data ){
    var html = new EJS({url : "/script/product_image.ejs"}).render(data);
    return html;
}
/**
* Render EJS with data.
* @api private
*/
function formatProductDescHtml( data ){
    var html = new EJS({url : "/script/product_desc.ejs"}).render(data);
    return html;
}

/**
* Format product HTML with span3, and add 'Detail' button.
* @param {string} 'Detail' button group ID (actually the button group is no need, button is ok)
* @param {string} HTML string who is inserted to the span3 div
* @api public Called by the pi.js when display product in PI.
*/
function spanProduct(btnGrpId, html){
    //add the detail button first
    var retHtml = "<div class=\"span3\">" + html;

    //add the action group for product
    var btnGrp = "<div id=\"" + btnGrpId + "\" class=\"btn-group\">";
    btnGrp = btnGrp + "<button class=\"btn btn-link\" >Detail</button>";
    //btnGrp = btnGrp + "<button class=\"btn btn-warning btn-small\" >Delete</button>";
    btnGrp = btnGrp + "</div>";

    retHtml = retHtml + btnGrp;

    var span = retHtml + "</div>";
    return span;
}

/**
* Format product summary html string by product json data.
* @param {Object} JSON obect of product.
* @api public Called by the pi.js when display product in PI.
*/
function convertJSON2ProductSummary(product){
    var html = '';

    //use the first image data as thumbnail image
    html = html + "<image src=\"" + product.images[0].imagesrc + "\"/>";
    html = html + "<p>" + product.feature.description + "</p>";
    return html;
}

/**
* Bind onclick event to 'Detail' button of product.
* @param {string} The product ID.
* @param {string} The button group ID who locate the 'Detail' button.
* @param {function} Onclick event handler
* @api public Called by the pi.js when view product detail in PI.
*/
function bindProductDetailBtnEvents(productId, btnGrpId, callback){
    //add the onclik action to the buttons in the button group
    $("#" + btnGrpId + " button:contains('Detail')").bind('click', function(event){
        event.stopPropagation();

        callback( productId, btnGrpId );
    });

}

function getAvaliableCategories(){
    //categories are 3: material, price, model
    
}