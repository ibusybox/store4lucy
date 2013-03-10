/**Client script**/

var QUERY_PRODUCT_SUMMARY_URL = '/getProductSummary';
/**Product manager start**/
var QUERY_PRODUCT_BATCH_COUNT = 6;


function queryProductByCount(){
    var i = 0;

    var count = 0;

    for( ; i < QUERY_PRODUCT_BATCH_COUNT; i++ ){
        $.post(QUERY_PRODUCT_SUMMARY_URL, JSON.stringify({"maxcount" : QUERY_PRODUCT_BATCH_COUNT, "current" : i + 1}), function(data, textStatus){
            var html = '';
            if ( textStatus == "success" ){
                //data is one createProductSummary object
                html = spanProduct( wrapedByLink(data.productNumber, data.productSummaryHTML) );
                //each row 4 columns
                if (count % 4 === 0){
                    $("<div class=\"row-fluid\"></div><hr>").insertBefore("footer");
                }
                $("div.row-fluid:last").append(html);    

            }else{
                html = spanProduct( "<h3>jQuery process error.</h3>" );

            }
            count ++;
    }, 'json');

    }

}

function wrapedByLink(id, data){
    var html = "<a href=\"" +  "/p" + "?id=" + id + "\">";
    html = html + data;
    html = html + "</a>";
    return html;
}

function spanProduct(html){
    var span = "<div class=\"span3\">" + html + "</div>";
    return span;
    }


function appendProduct2HTML(productsHTML){

}
/**Product manager end**/