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
    $.get( URL_QUERY_PI_DETAIL_BY_NO_WITH_PRODUCTCONTENT_JSON + '/?pi_no=' + piNO, function( PI ){
        // server return shold contain an attribute(product_list) than contains product list as PI include
        var renderData = {pi: PI};
        var html = new EJS({url: '/script/pi.ejs'}).render(renderData);
        $("#contentContainer").append(html);
    } );
}
