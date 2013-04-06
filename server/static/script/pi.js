var QUERY_PI_ONCE_COUNT = 5;
var QUERY_PI_URL = '/pi/queryPIByCount';

function getPIMenu(){
return createDropdownMenu(['New PI']);
}

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


/**Privat method start**/
function insertJson2DocumentAsHTML(PIJson){
    var html = '';
    html = html + '<div class="row-fluid">' + '<div class="span12">' + '<h3>PI Description</h3>';
    html = html + '<p>This PI <strong>' + PIJson.pi_no + '</strong> is created by <strong>' + PIJson.creator + '</strong></p>';
    //end of row-fluid div
    html = html + '</div></div><h3>Products In PI</h3>';

    $(html).insertBefore("footer");
    //$("#contentContainer").append( html );


    //products info for PI is inside the second div
    var count = 0;
    for ( var i = 0; i < PIJson.product_list.length; i++ ){
      if ( count % 4 === 0 ){
        $('<div class="row-fluid"></div><hr>').insertBefore("footer");
      }
      var productSummary = convertJSON2ProductSummary( PIJson.product_list[i] );
      var productSpan = spanProduct( PIJson.pi_no + '_' + PIJson.product_list[i].feature.number, productSummary );
      $("#contentContainer div.row-fluid:last").append( productSpan );
      //bind product button events
      bindBtnEvents( PIJson.product_list[i].feature.number, PIJson.pi_no + '_' + PIJson.product_list[i].feature.number );
      count ++;
    }

    return html;  
}
/**Private method end**/