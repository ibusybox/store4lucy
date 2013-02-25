/**Client script**/

/**Product manager start**/
var QUERY_PRODUCT_BATCH_COUNT = 50;
function queryProductByCount(){
    $.post('/queryproduct', {"count" : 50}, function(data){
        //data is an array of product object
        var i = 0;
        var product = '';
        for (; i < data.length; i++){
            product = data[i];
            //each row 4 columns
            if (i % 4 === 0){
                $("<div class=\"row-fluid\"></div><hr>").insertBefore("footer");
                            }
            //insert the new product to the first
            $("div.row-fluid:last").append(product2HTML(product));
        }
        

    }, 'json');
}

function product2HTML(product){
    var html = '';
    html = "<div class=\"span3\">";

    html = "<image src = " + product.productImage[0] + " width=\"23%\"></image><p>" + product.productDescription + "</p>" + "<a href=\"\">more...</a>"
    
    html = html + "</div>"
    return html;
}
function appendProduct2HTML(productsHTML){

}
/**Product manager end**/