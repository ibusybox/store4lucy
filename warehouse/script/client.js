/**Client script**/

var QUERY_PRODUCT_URL = '/queryproduct';
/**Product manager start**/
var QUERY_PRODUCT_BATCH_COUNT = 50;
function queryProductByCount(){
    var i = 0;
    $.post(QUERY_PRODUCT_URL, {"count" : 50}, function(data, textStatus){
        var html = '';
        if ( textStatus == "success" ){
            //data is one createProductSummary object
            html = wrapedByLink(data.productNumber, data.productSummaryHTML);
        
            //each row 4 columns
            if (i % 4 === 0){
                $("<div class=\"row-fluid\"></div><hr>").insertBefore("footer");
            }
            $("div.row-fluid:last").append(html);    

        }else{
            html = "<h3>jQuery process error.</h3>";

        }
        i++;

    }, 'json');
}

function wrapedByLink(id, data){
    var html = "<a href=\"" +  QUERY_PRODUCT_URL + "?id=" + id + "\">";
    html = html + data;
    html = html + "</a>";
    return html;
}


function appendProduct2HTML(productsHTML){

}
/**Product manager end**/