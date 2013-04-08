var QUERY_PI_ONCE_COUNT = 5;
var QUERY_PI_URL = '/pi/queryPIByCount';
var QUERY_PI_BY_NO = '/pi/queryPIByNO';

/**
* Query PI by count index.
* @api public Called by PI index page.
*/
function queryPIByCount(){
    var count = 0;
    for ( ; count < QUERY_PI_ONCE_COUNT; count ++ ){
        $.post(QUERY_PI_URL, JSON.stringify( {'maxcount' : QUERY_PI_ONCE_COUNT, 'current' : count} ), function( data, textStatus ){
            if ( textStatus != "success" ){
                //wrote error to page
                alert(textStatus) ;
            }else{
                insertJson2DocumentAsHTML( data );
            }
        }, 
        'json' );
    }
}

/**
* Format PI html string from PI JSON data.
* @param {Object} JSON data of PI.
* @api private
*/
function insertJson2DocumentAsHTML(PIJson){
    var html = '';
    html = html + '<div class="row-fluid">' + '<div class="span12">' + '<h3>' + PIJson.pi_no + '</h3>'
    html = html + '<p>This PI is created by <strong>' + PIJson.creator + '</strong><button class="btn btn-link">Detail</button></p>';
    //end of row-fluid div
    html = html + '</div></div><h3>Products In PI</h3>';

    $("#contentContainer").append(html);


    //products info for PI is inside the second div
    var count = 0;
    var btnGrpId = '';
    for ( var i = 0; i < PIJson.product_id_list.length; i++ ){
      if ( count % 4 === 0 ){
        $("#contentContainer").append('<div class="row-fluid"></div><hr>');
      }
      btnGrpId = 'btnGrp_' + PIJson.pi_no + '_' + PIJson.product_id_list[i].feature.number;
      var productSummary = convertJSON2ProductSummary( PIJson.product_id_list[i] );
      var productSpan = spanProduct( btnGrpId, productSummary );
      $("#contentContainer div.row-fluid:last").append( productSpan );
      //add PI no as hidden element
      $("#" + btnGrpId ).append('<input type="hidden" name="pi_no" value="' + PIJson.pi_no + '">');
      
      //bind product button events by call function in product.js
      bindProductDetailBtnEvents( 
        PIJson.product_id_list[i].feature.number, 
        btnGrpId, 
        ProductDetailOnClick );
      count ++;
    }

    return html;  
}

/**
* View product detail in PI.
* @param {string} The product ID which want view.
* @param {string} The button group ID where the 'Detail' button located in.
* @api public Called in bindProductDetailBtnEvents function of product.js, when user click the 'Detail' button.
*/
function ProductDetailOnClick( productId, btnGrpId ){
    var pi_no = $('#' + btnGrpId + ' input[name="pi_no"]').val();
    $.post( QUERY_PI_BY_NO, 
        JSON.stringify( {"pi_no" : pi_no, "product_id" : productId} ), 
        function( data, textStatus ){
            if ( textStatus == 'success' ){
                //return data is a PI object, but only contains one product data
                $('#contentContainer').empty();
                
                //insert the pi html page framework into the dom
                var html = new EJS( {url: '/script/pi.ejs'} ).render(data);
                $("#contentContainer").append(html);
                //insert product images
                html = new EJS( {url: '/script/product_image.ejs'} ).render(data.product_id_list[0]);
                $("#images").append(html);
                //insert product description
                html = new EJS( {url: '/script/product_desc.ejs'} ).render(data.product_id_list[0]);
                $("#feature").append(html);

            }else{
                alert('Get product detain in PI error, error = ' + textStatus);
            }
    }, 'json' );
}
