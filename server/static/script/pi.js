var QUERY_PI_COUNT_ONCE = 6;

function handleGetPIHomePage(){
    var indexList = '';
    for( var i = 0; i < QUERY_PI_COUNT_ONCE; i++ ){
        if (i == 0){
            indexList = i;
        }else{
            indexList = indexList + ',' + i;
        }
        
    }
    window.location.href = URL_QUERY_PI_BY_COUNT_INDEX_HTML + '/?count_list=' + indexList;
}

function handleGetPIByCountIndexHTML(){
    var countList = getURLParameter('count_list').split(',');
    var count = 0;
    for ( var i = 0 ; i < countList.length; i++ ){
        $.get( URL_QUERY_PI_BY_COUNT_INDEX_JSON + '/?current=' + i, function( pi ){
            var renderData = {pi: pi};
            var html = new EJS({url: '/script/pi_summary.ejs'}).render(renderData);
            if ( count % 4 === 0 ){
                $("#contentContainer").append("<div class=\"row-fluid\"></div><hr>");
            }
            $("div.row-fluid:last").append(html);

            count ++;
        } );
    }
}

function handleGetPIDetailByPINOHTML(){
    var piNO = getURLParameter('pi_no');
    //the first span3 is the purchase summary, so count start from 1
    var count = 0;
    $.get( URL_QUERY_PI_DETAIL_BY_NO_WITH_PRODUCTCONTENT_JSON + '/?pi_no=' + piNO, function( PI ){
        // server return shold contain an attribute(product_list) than contains product list as PI include

        //append the row-fluid first
        $("#contentContainer").append('<div class="row-fluid"></div>');

        //append the purchase detail, span9
        $("div.row-fluid:last").append('<div class="span9"></div>');

        //append the purchase summaray and packing info, span3
        //$("div.row-fluid:last").append('<div id="purchase_info" class="span3"></div>');

        var renderData;
        //append the each product pruchase detail,
        var productPurchase, product, purchaseInfoHTML;
        for ( var i = 0; i < PI.product_purchase_list.length; i++ ){
            productPurchase = PI.product_purchase_list[i];
            //find the product object by product id in product purchase info
            for ( var j = 0; j < PI.product_list.length; j++ ){
                product = PI.product_list[j];
                if ( product.feature.number === productPurchase.product_id ){
                    break;
                }
            }

            //render the product pruchase html
            renderData = {product: product, product_purchase: productPurchase};
            purchaseInfoHTML = new EJS({url: '/script/pi_purchase_info.ejs'}).render(renderData);
            if ( count % 4 === 0 ){
                $("div.row-fluid:first div.span9").append('<div class="row-fluid"></div>');
            }
            $("div.row-fluid:last").append(purchaseInfoHTML)
            count ++;
        }

        //append the PI summary
        renderData = {pi: PI};
        var PISummaryHTML = new EJS({url: '/script/pi_purchase_summary.ejs'}).render(renderData);
        $("div.row-fluid:first div.span9").after(PISummaryHTML);

        //TODO append the packing info
        //...
        
    } );
}
