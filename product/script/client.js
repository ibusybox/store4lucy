/**Client script**/

var QUERY_PRODUCT_SUMMARY_URL = '/getProductSummary';

var SEARCH_PRODUCT_URL = '/product/q';

var PRODUCT_HOME = "/home/products/";

/**Product manager start**/
var QUERY_PRODUCT_BATCH_COUNT = 5;

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
                html = spanProduct( data.number, convertJSON2ProductSummary(data) );
                
                //each row 4 columns
                if (count % 4 === 0){
                    $("<div class=\"row-fluid\"></div><hr>").insertBefore("footer");
                }
                $("div.row-fluid:last").append(html);    

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
function queryProductByID(id){
    $.post(SEARCH_PRODUCT_URL, JSON.stringify({"id" : id}), function(data, textStatus){ 
        if ( textStatus == "success" ){
            $.colorbox({html:data});
        }else{
            $.colorbox({html:"<h3>Get product detail error.</h3>"}); 
        }
                     
    }, 'html');


}

function spanProduct(id, html){
    //add the detail button first
    var retHtml = "<div class=\"span3\">" + html;
    retHtml = retHtml + "<input type=\"button\" id = \"" + id + "\"" + "class=\"btn btn-success\" value=\"View Detail\" onclick=\"queryProductByID(this.id)\"/>";

    var span = retHtml + "</div>";
    return span;
}

function convertJSON2ProductSummary(product){
    var html = '';

    //use the first image data as thumbnail image
    html = html + "<image src=\"" + PRODUCT_HOME + product.image.split(",")[0] + "\"/>";
    html = html + "<p>" + product.description + "</p>";
    return html;
}


/**Product manager end**/