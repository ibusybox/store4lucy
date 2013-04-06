/**Client script**/

var QUERY_PRODUCT_SUMMARY_URL = '/getProductSummary';

var SEARCH_PRODUCT_URL = '/product/q';

/**Product manager start**/
var QUERY_PRODUCT_BATCH_COUNT = 20;

/**
* @method Query product by count, called by the index.html page, when loading page.
* 
**/
function queryProductByCount(){
    var i = 0;

    var count = 0;

    for( ; i < QUERY_PRODUCT_BATCH_COUNT; i++ ){
        $.post(QUERY_PRODUCT_SUMMARY_URL, JSON.stringify({"maxcount" : QUERY_PRODUCT_BATCH_COUNT, "current" : i + 1}), function(data, textStatus){
            var html = '';
            if ( textStatus == "success" ){
                //data is one createProductSummary object
                html = spanProduct( data.feature.number, convertJSON2ProductSummary(data) );
                
                //each row 4 columns
                if (count % 4 === 0){
                    //$("<div class=\"row-fluid\"></div><hr>").insertBefore("footer");
                    $("#contentContainer").append("<div class=\"row-fluid\"></div><hr>");
                }
                $("div.row-fluid:last").append(html);    
                bindBtnEvents(data.feature.number, data.feature.number);
            }else{
                html = spanProduct( 0, "<h3>jQuery process error.</h3>" );

            }
            count ++;
    }, 'json');

    }

}

/**
* @method Detail button onclick action. 
* Popup a dialog to show the detai info.
**/
function queryProductByID(productId, btnGrpId){
    $.post(SEARCH_PRODUCT_URL, JSON.stringify({"id" : productId}), function(data, textStatus){ 
        if ( textStatus == "success" ){
            //$("#btnGrp_" + btnGrpId ).colorbox({opacity : 0, open : true, html : formatProductHtml(data)}); 
            $("#contentContainer").empty();
            var html = formatProductHtml(data);
            //alert(html);
            //$(html).insertBefore("footer");
            $("#contentContainer").append(html);
        }else{
            alert('Get product detail error.');
            //$.colorbox({opacity : 1, html : "<h3>Get product detail error.</h3>"}); 
        }
                     
    }, 'json');


}

function formatProductHtml(data){
    var html = new EJS({url : "/product/product.ejs"}).render(data);
    return html;
}

function spanProduct(btnGrpId, html){
    //add the detail button first
    var retHtml = "<div class=\"span3\">" + html;

    //add the action group for product
    var btnGrp = "<div id=\"" + "btnGrp_" + btnGrpId + "\" class=\"btn-group\">";
    btnGrp = btnGrp + "<button class=\"btn btn-link\" >Detail</button>";
    //btnGrp = btnGrp + "<button class=\"btn btn-warning btn-small\" >Delete</button>";
    btnGrp = btnGrp + "</div>";

    retHtml = retHtml + btnGrp;

    var span = retHtml + "</div>";
    return span;
}

function convertJSON2ProductSummary(product){
    var html = '';

    //use the first image data as thumbnail image
    html = html + "<image src=\"" + product.images[0].imagesrc + "\"/>";
    html = html + "<p>" + product.feature.description + "</p>";
    return html;
}

function bindBtnEvents(productId, btnGrpId){
    //add the onclik action to the buttons in the button group
    $("#btnGrp_" + btnGrpId + " button:contains('Detail')").bind('click', function(event){
        event.stopPropagation();

        queryProductByID( productId, btnGrpId );
    });

}


/**Product manager end**/