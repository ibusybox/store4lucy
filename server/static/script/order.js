
var QUERY_ORDER_MAX_COUNT = 6;

function handleGetOrderByCountIndexHTML(){
    var countList = getURLParameter('count_list').split(',');
    var count = 0;
    for ( var i = 0; i < countList.length; i++ ){
        $.get( URL_QUERY_ORDER_BY_COUNT_INDEX_JSON + '/?maxcount=' + countList.length + '&current=' + i, function( data ){
            if ( data.error ){
                //nothing
            }else{
                var order = {order: data.data};
                var html = new EJS( {url: '/script/order.ejs'} ).render( order );
                //each row 4 columns
                if (count % 4 === 0){
                    //$("<div class=\"row-fluid\"></div><hr>").insertBefore("footer");
                    $("#contentContainer").append("<div class=\"row-fluid\"></div><hr>");
                }                
                $("div.row-fluid:last").append(html);
                count ++;
            }
        }, 'json' );
    }
}

function handleGetOrderHomePage(){
    var countList = '';
    for ( var i = 0; i < QUERY_ORDER_MAX_COUNT; i++ ){
        if ( i == 0 ){
            countList = i;
        }else{
            countList = countList + ',' + i;
        }
    }
    window.location.href = URL_QUERY_ORDER_BY_COUNT_INDEX_HTML + '/?count_list=' + countList;
}