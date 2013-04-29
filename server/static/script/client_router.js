/**
* Route client path name
* @param {string} pathname, the pathname client route depends on.
* @api public, called by index page
*/
function startClientRoute(pathname){
        if ( pathname == '/product' || pathname == '/product/' ){
          handleGetProductHoemPage();
        }else if ( pathname == URL_QUERY_PRODUCT_LIST_HTML || pathname == URL_QUERY_PRODUCT_LIST_HTML + '/' ){
          handleGetProductListHTML();
        }else if (pathname == URL_QUERY_PRODUCT_HTML || pathname == URL_QUERY_PRODUCT_HTML + '/'){
          handleGetProductByIDHTML();
        }else if ( pathname == '/pi' || pathname == '/pi/'){
          handleGetPIHomePage();
          setupPIMenu();
        }else if ( pathname == URL_QUERY_PI_BY_COUNT_INDEX_HTML || pathname == URL_QUERY_PI_BY_COUNT_INDEX_HTML + '/'){
          handleGetPIByCountIndexHTML();
          setupPIMenu();
        }else if ( pathname == URL_QUERY_PI_DETAIL_BY_NO_WITH_PRODUCTCONTENT_HTML || pathname == URL_QUERY_PI_DETAIL_BY_NO_WITH_PRODUCTCONTENT_HTML + '/' ){
          handleGetPIDetailByPINOHTML();
          setupPIMenu();
        }else if (pathname == '/order' || pathname == '/order/'){
          handleGetOrderHomePage();
        }else if ( pathname == URL_QUERY_ORDER_BY_COUNT_INDEX_HTML || pathname == URL_QUERY_ORDER_BY_COUNT_INDEX_HTML + '/'){
          handleGetOrderByCountIndexHTML();
        }
}

/**
* Setup the PI menu when route to PI page.
*/
function setupPIMenu(){
  $('#actionMenu').append('<li><button id="btn-new-pi" class="btn btn-link">New PI</button></li>');
  $('#actionMenu').append('<li><button id="btn-export-pi-quatation" class="btn btn-link">Export PI(Quatation)</button></li>');
}