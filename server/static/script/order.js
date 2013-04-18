
var QUERY_ORDER_BY_COUNT_URL = '/order/q/count';
var QUERY_ORDER_MAX_COUNT = 6;

function queryOrderByCount(){
    var count = 0;
    for ( var i = 0; i < QUERY_ORDER_MAX_COUNT; i++ ){
        $.get( QUERY_ORDER_BY_COUNT_URL + '/?maxcount=' + QUERY_ORDER_MAX_COUNT + '&current=' + i, function( data ){
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